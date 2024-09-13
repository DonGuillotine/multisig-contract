const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWalletFactory", function () {
  let MultiSigWalletFactory;
  let factory;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    MultiSigWalletFactory = await ethers.getContractFactory("MultiSigWalletFactory");
    factory = await MultiSigWalletFactory.deploy();
    await factory.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy the factory contract", async function () {
      expect(await factory.getAddress()).to.be.properAddress;
    });
  });

  describe("Wallet Creation", function () {
    it("Should create a new MultiSig wallet", async function () {
        const validSigners = [addr1.address, addr2.address];
        const quorum = 2;
      
        const tx = await factory.createMultiSigWallet(validSigners, quorum);
        const receipt = await tx.wait();

        const event = receipt.logs.find(log => log.eventName === "WalletCreated");
        
        if (event) {
          console.log("WalletCreated event emitted with args:", event.args);
        } else {
          console.log("WalletCreated event not found");
        }

        expect(event).to.not.be.undefined;

        expect(event.args.length).to.equal(3);

        expect(ethers.isAddress(event.args[0])).to.be.true;

        expect(event.args[1]).to.have.property('_isIndexed', true);
    
        expect(event.args[2]).to.equal(BigInt(quorum));
      });
  
    it("Should store the created wallet address", async function () {
      const validSigners = [addr1.address, addr2.address];
      const quorum = 2;
  
      await factory.createMultiSigWallet(validSigners, quorum);
      const storedAddress = await factory.getDeployedWallet(0);
  
      expect(storedAddress).to.be.properAddress;
    });
  });

  describe("Wallet Retrieval", function () {
    it("Should retrieve the correct wallet address", async function () {
      const validSigners = [addr1.address, addr2.address];
      const quorum = 2;

      const tx = await factory.createMultiSigWallet(validSigners, quorum);
      const receipt = await tx.wait();
      const event = receipt.logs.find(log => log.eventName === "WalletCreated");
      const createdWalletAddress = event.args[0];

      const retrievedAddress = await factory.getDeployedWallet(0);

      expect(retrievedAddress).to.equal(createdWalletAddress);
    });

    it("Should revert when trying to retrieve a non-existent wallet", async function () {
      await expect(factory.getDeployedWallet(0))
        .to.be.revertedWithPanic(0x32);
    });
  });
});