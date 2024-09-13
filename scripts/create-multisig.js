const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployedAddresses = JSON.parse(fs.readFileSync("deployed-addresses.json", "utf8"));
  const factoryAddress = deployedAddresses.MultiSigWalletFactory;

  const MultiSigWalletFactory = await hre.ethers.getContractFactory("MultiSigWalletFactory");
  const factory = MultiSigWalletFactory.attach(factoryAddress);

  console.log("Creating new MultiSig wallet...");

  const [deployer] = await hre.ethers.getSigners();

  const validSigners = [
    deployer.address,
    hre.ethers.Wallet.createRandom().address,
    hre.ethers.Wallet.createRandom().address
  ];
  const quorum = 2;

  console.log("Valid signers:", validSigners);

  const tx = await factory.createMultiSigWallet(validSigners, quorum);
  const receipt = await tx.wait();

  const event = receipt.logs.find(log => log.fragment && log.fragment.name === "WalletCreated");
  const newWalletAddress = event.args[0];

  console.log("New MultiSig wallet created at:", newWalletAddress);

  const retrievedAddress = await factory.getDeployedWallet(0);
  console.log("Retrieved wallet address:", retrievedAddress);

  if (retrievedAddress === newWalletAddress) {
    console.log("Wallet address successfully verified.");
  } else {
    console.error("Error: Retrieved address does not match created address.");
  }

  deployedAddresses.MultiSigWallet = newWalletAddress;
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(deployedAddresses, null, 2));
  console.log("Deployed addresses updated in deployed-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });