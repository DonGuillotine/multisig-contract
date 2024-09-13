const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const deployedAddresses = JSON.parse(fs.readFileSync("deployed-addresses.json", "utf8"));
  const multiSigAddress = deployedAddresses.MultiSigWallet;

  console.log("Funding MultiSig wallet at:", multiSigAddress);
  console.log("Deployer address:", deployer.address);

  const initialBalance = await hre.ethers.provider.getBalance(multiSigAddress);
  console.log("Initial MultiSig wallet balance:", hre.ethers.formatEther(initialBalance), "ETH");

  try {
    const tx = await deployer.sendTransaction({
      to: multiSigAddress,
      value: hre.ethers.parseEther("0.01") // Sending 0.01 ETH
    });

    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for transaction confirmation...");

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);

    const newBalance = await hre.ethers.provider.getBalance(multiSigAddress);
    console.log("New MultiSig wallet balance:", hre.ethers.formatEther(newBalance), "ETH");
  } catch (error) {
    console.error("Error sending transaction:", error.message);
    if (error.transaction) {
      console.error("Failed transaction details:", error.transaction);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});