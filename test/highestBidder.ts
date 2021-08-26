import { Contract } from "@ethersproject/contracts";
import { expect } from "chai"
import { ethers } from 'hardhat'
import { Big } from 'big.js'

describe("HighestBidder contract", () => {
  const initialValue: Big = new Big(5 * 10 ** 18);
  const maxedCounter = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  let deployedHighestBidder: Contract, HighestBidder;
  let owner: { address: any; }, addr1, addr2;

  beforeEach(async () => {
    HighestBidder = await ethers.getContractFactory("HighestBidder");

    [owner, addr1, addr2] = await ethers.getSigners();

    deployedHighestBidder = await HighestBidder.deploy(initialValue.toString());
  });
});