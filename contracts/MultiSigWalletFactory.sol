// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Multisig.sol";

contract MultiSigWalletFactory {

    Multisig[] public multisigClones;

    event WalletCreated(address indexed wallet, address[] indexed validSigners, uint8 quorum);

    function createMultiSigWallet(address[] memory _validSigners, uint8 quorum) external returns (address wallet){
        Multisig newMsgWallet = new Multisig(quorum, _validSigners);
        emit WalletCreated(address(newMsgWallet), _validSigners, quorum);
        multisigClones.push(newMsgWallet);
        return address(newMsgWallet);
    }

    function getDeployedWallet(uint index) public view returns (address) {
        return address(multisigClones[index]);
    }
}
