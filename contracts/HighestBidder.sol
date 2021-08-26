pragma solidity ^0.8.4;

import './Auction.sol';

contract HighestBidder is Auction {

    constructor(uint initialValue) Auction(initialValue) {

    }
}