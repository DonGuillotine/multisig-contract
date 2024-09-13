const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployedAddresses = JSON.parse(fs.readFileSync("deployed-addresses.json", "utf8"));
  const multiSigAddress = deployedAddresses.MultiSigWallet;

  console.log("Verifying MultiSig wallet at:", multiSigAddress);

  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const multisig = Multisig.attach(multiSigAddress);

  try {
    const quorum = await multisig.quorum();
    console.log("Current quorum:", quorum.toString());

    const noOfValidSigners = await multisig.noOfValidSigners();
    console.log("Number of valid signers:", noOfValidSigners.toString());

    console.log("MultiSig wallet verified successfully");
  } catch (error) {
    console.error("Error verifying MultiSig wallet:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});