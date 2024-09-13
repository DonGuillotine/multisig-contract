const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployedAddresses = JSON.parse(fs.readFileSync("deployed-addresses.json", "utf8"));
  const multiSigAddress = deployedAddresses.MultiSigWallet;

  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const multisig = Multisig.attach(multiSigAddress);

  const [deployer] = await hre.ethers.getSigners();

  console.log("Interacting with MultiSig wallet at:", multiSigAddress);

  const recipient = "0x1234567890123456789012345678901234567890"; 
  const amount = hre.ethers.parseUnits("1", 18); 
  const tokenAddress = "0x68194a729C2450ad26072b3D33ADaCbcef39D574";

  console.log("Proposing transaction...");
  const proposeTx = await multisig.transfer(amount, recipient, tokenAddress);
  await proposeTx.wait();
  console.log("Transaction proposed");

  console.log("Approving transaction...");
  const approveTx = await multisig.approveTx(1); 
  await approveTx.wait();
  console.log("Transaction approved");

  const newQuorum = 3;
  console.log("Proposing quorum update...");
  const proposeQuorumTx = await multisig.proposeQuorumUpdate(newQuorum);
  await proposeQuorumTx.wait();
  console.log("Quorum update proposed");

  console.log("Approving quorum update...");
  const approveQuorumTx = await multisig.approveQuorumUpdate();
  await approveQuorumTx.wait();
  console.log("Quorum update approved");

  const updatedQuorum = await multisig.quorum();
  console.log("Updated quorum:", updatedQuorum.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });