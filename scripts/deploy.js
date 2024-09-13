const hre = require("hardhat");

async function main() {
  console.log("Deploying MultiSigWalletFactory...");

  const MultiSigWalletFactory = await hre.ethers.getContractFactory("MultiSigWalletFactory");
  const factory = await MultiSigWalletFactory.deploy();

  await factory.waitForDeployment();

  console.log("MultiSigWalletFactory deployed to:", await factory.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });