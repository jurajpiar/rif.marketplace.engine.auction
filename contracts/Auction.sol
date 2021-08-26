pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {
    struct Bid {
        uint value;
        uint counterValue;
    }

    mapping(address => Bid) bids;
    address private _winner;

    uint startTime;

    constructor(uint initialValue) {
        bids[msg.sender] = Bid(initialValue, 0);
        _winner = msg.sender;
    }

    function getBid(address from) public view returns (uint, uint) {
        Bid memory bid = bids[from];
        return (bid.value, bid.counterValue);
    }

    function getWinner() public view returns (address) {
        return _winner;
    }

}
