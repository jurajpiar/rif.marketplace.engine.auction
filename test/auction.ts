import { Contract } from "@ethersproject/contracts";
import { expect } from "chai"
import { ethers } from 'hardhat'
import { Big } from 'big.js'

describe("Auction contract", () => {
  const initialValue: Big = new Big(5 * 10 ** 18);

  let deployedAuction: Contract, Auction;
  let owner: { address: any; }, addr1, addr2;

  beforeEach(async () => {
    Auction = await ethers.getContractFactory("Auction");

    [owner, addr1, addr2] = await ethers.getSigners();

    deployedAuction = await Auction.deploy(initialValue.toString());
  });

  describe("Deployment", function () {
    it("Should set the right owner", async () => {
      expect(await deployedAuction.owner()).to.equal(owner.address);
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
    })

    it('should initialise winner with the owner address', async () => {
      const actualAddress = await deployedAuction.getWinner();

      expect(actualAddress).to.eq(owner.address);
    });

  });
});