import { Contract } from "@ethersproject/contracts";

import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised";
import { ethers } from 'hardhat'
import { Big } from 'big.js'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(chaiAsPromised);

describe("Auction contract", () => {
  const initialValue: Big = new Big(5 * 10 ** 18);
  const maxedCounter = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  let deployedAuction: Contract, Auction;
  let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress;

  beforeEach(async () => {
    Auction = await ethers.getContractFactory("Auction");

    [owner, addr1, addr2] = await ethers.getSigners();

    deployedAuction = await Auction.deploy(initialValue.toString());
  });

  describe("Deployment", function () {
    it("Should set the right owner", async () => {
      expect(await deployedAuction.owner()).to.equal(owner.address);
    });

    it('should initialise counterStart with -1', async () => {
      const counterStart = await deployedAuction.getCounterStart();

      expect(counterStart).to.equal(maxedCounter);
    });
  });

  describe('Bid', () => {
    it('should initialise bids with the initial value defined by owner', async () => {
      const [value] = await deployedAuction.getBid(owner.address);

      expect(Big(value).eq(initialValue)).to.be.true;
    });
    it('should initialise bid with counterValue set to 0', async () => {
      const [, counterValue] = await deployedAuction.getBid(owner.address);

      expect(counterValue).to.eq(0);
    });
  });

  describe('winner', () => {
    it('should initialise winner with the owner address', async () => {
      const actualAddress = await deployedAuction.getWinner();

      expect(actualAddress).to.eq(owner.address);
    });

    // it('should return winner address and winning bid', async () => {
    //   await 
    //   const [actualAddress] = await deployedAuction.getWinner();
    // })
  });

  describe('Counters', () => {
    it('should get counters', async () => {
      const counterStart = await deployedAuction.getCounterStart();
      const counterEnd = await deployedAuction.getCounterEnd();

      expect(counterStart).to.eq(maxedCounter);
      expect(counterEnd).to.eq(0);
    });
  });

  describe('start', () => {
    it('should set counterStart', async () => {
      const expectedCounterStart = (new Date()).getTime();
      await deployedAuction.start(expectedCounterStart);
      const counterStart = await deployedAuction.getCounterStart();

      expect(counterStart).to.equal(expectedCounterStart);
    });
    it('should be only callable by owner', async () => {
      const startPromise = deployedAuction.connect(addr1).start(1);

      await expect(startPromise).to.be.eventually.rejectedWith("Ownable: caller is not the owner");
    })
  });

  describe('changeValue', () => {
    it('should be only callable by owner', async () => {
      const startPromise = deployedAuction
        .connect(addr1)
        .changeValue(1);

      await expect(startPromise).to.be
        .eventually
        .rejectedWith("Ownable: caller is not the owner");
    });

    it('should change the value of the item', async () => {
      const [initialValue] = await deployedAuction.getBid(owner.address);
      const expectedValue = 9999;
      expect(expectedValue).not.to.eq(initialValue);
      await deployedAuction.changeValue(expectedValue);
      const [actualValue] = await deployedAuction.getBid(owner.address);

      expect(actualValue).to.eq(expectedValue);
    })
  });
});