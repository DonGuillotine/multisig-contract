const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Multisig", function () {
  let Multisig;
  let multisig;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    Multisig = await ethers.getContractFactory("Multisig");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    multisig = await Multisig.deploy(2, [owner.address, addr1.address, addr2.address]);
    await multisig.waitForDeployment();
  });

  describe("Quorum Update", function () {
    it("Should allow a valid signer to propose a quorum update", async function () {
      await expect(multisig.proposeQuorumUpdate(3))
        .to.emit(multisig, "QuorumUpdateProposed")
        .withArgs(3);

      expect(await multisig.proposedQuorum()).to.equal(3);
      expect(await multisig.quorumUpdateApprovals()).to.equal(1);
    });

    it("Should not allow an invalid signer to propose a quorum update", async function () {
      await expect(multisig.connect(addr3).proposeQuorumUpdate(3))
        .to.be.revertedWith("Not a valid signer");
    });

    it("Should not allow proposing an invalid quorum value", async function () {
      await expect(multisig.proposeQuorumUpdate(1))
        .to.be.revertedWith("Invalid quorum value");

      await expect(multisig.proposeQuorumUpdate(4))
        .to.be.revertedWith("Invalid quorum value");
    });

    it("Should not allow proposing the same quorum value", async function () {
      await expect(multisig.proposeQuorumUpdate(2))
        .to.be.revertedWith("New quorum must be different");
    });

    it("Should not allow proposing a new quorum when there's an existing proposal", async function () {
      await multisig.proposeQuorumUpdate(3);
      await expect(multisig.proposeQuorumUpdate(3))
        .to.be.revertedWith("Existing proposal pending");
    });

    it("Should allow valid signers to approve quorum update and update when quorum is reached", async function () {
      await multisig.proposeQuorumUpdate(3);
      
      await expect(multisig.connect(addr1).approveQuorumUpdate())
        .to.emit(multisig, "QuorumUpdated")
        .withArgs(2, 3);

      expect(await multisig.quorum()).to.equal(3);
      expect(await multisig.quorumUpdateProposalId()).to.equal(0);
      expect(await multisig.proposedQuorum()).to.equal(0);
      expect(await multisig.quorumUpdateApprovals()).to.equal(0);
    });

    it("Should not allow approving quorum update when there's no proposal", async function () {
      await expect(multisig.approveQuorumUpdate())
        .to.be.revertedWith("No quorum update proposal");
    });
  });
});