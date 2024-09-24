# MultiSig Wallet Smart Contract

## Overview

This repository contains Solidity contracts for a **Multi-Signature (MultiSig) Wallet** designed to manage ERC-20 token transactions securely. It requires multiple approvals from authorized signers before executing any transaction, thus providing enhanced security by preventing unilateral fund control.

This project is built using the **Hardhat** development environment and includes smart contracts, test files, and deployment scripts.

## Features

### MultiSig Wallet (`Multisig` contract)
- **Secure ERC-20 token management**: Requires consensus (quorum) from multiple signers to execute transactions.
- **Quorum management**: Functionalities to propose and update the quorum through multi-signer approval.
- **Transaction tracking and security**: Ensures that each transaction is signed only once by each signer and tracks the status of each transaction.

### Wallet Factory (`MultiSigWalletFactory` contract)
- **Wallet deployment**: Allows for the creation of multiple independent MultiSig wallets.
- **Tracking of wallets**: Maintains a record of all deployed wallets, retrievable by users.

## Project Structure

```
|-- contracts/
|   |-- Multisig.sol               # MultiSig Wallet contract
|   |-- MultiSigWalletFactory.sol  # Factory contract for creating MultiSig wallets
|
|-- test/
|   |-- Multisig.js                # Tests for MultiSig Wallet functionality
|   |-- MultiSigWalletFactory.js   # Tests for the Wallet Factory functionality
|
|-- scripts/
|   |-- check-balance.js           # Script to check the wallet's token balance
|   |-- create-multisig.js         # Script to create a new MultiSig wallet
|   |-- deploy.js                  # Script for deploying contracts
|   |-- fund-multisig.js           # Script to fund a MultiSig wallet
|   |-- interact-multisig.js       # Script for interacting with a deployed MultiSig wallet
|   |-- verify-multisig.js         # Script to verify contract
|
|-- README.md                      # Project documentation
|-- hardhat.config.js              # Configuration file for Hardhat
|-- package.json                   # Project dependencies and scripts
|-- .gitignore                     # Specifies intentionally untracked files to ignore
```

## Installation

### Prerequisites
- Node.js
- Hardhat

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DonGuillotine/multisig-contract.git
   cd multisig-contract
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

## Testing

Run the test suite to verify the functionality of the contracts:
```bash
npx hardhat test
```

## Scripts and Usage

### Deploying the Contracts

Use the `deploy.js` script to deploy the contracts on the blockchain, feel free to use any testnet or mainnet of your choice (For Mainnet deployment, test the code thoroughly and audit):
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Creating a MultiSig Wallet

The `create-multisig.js` script facilitates the creation of a new MultiSig wallet:
```bash
npx hardhat run scripts/create-multisig.js --network sepolia
```

### Funding a Wallet

To fund a wallet with ERC-20 tokens, use the `fund-multisig.js` script:
```bash
npx hardhat run scripts/fund-multisig.js --network sepolia
```

### Checking Wallet Balance

Check the balance of tokens in a wallet using the `check-balance.js` script:
```bash
npx hardhat run scripts/check-balance.js --network sepolia
```

### Interacting with a Wallet

Execute transactions and manage the wallet with the `interact-multisig.js` script:
```bash
npx hardhat run scripts/interact-multisig.js --network sepolia
```

### Verifying Contracts

Verify the deployed contracts using the `verify-multisig.js` script:
```bash
npx hardhat run scripts/verify-multisig.js --network sepolia
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
