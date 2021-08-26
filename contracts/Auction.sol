pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {
    struct Bid {
        uint value;
        uint counterValue;
    }

    mapping(address => Bid) bids;
    address private _winner;

    uint _counterStart;
    uint _counterEnd;

    constructor(uint initialValue) {
        bids[msg.sender] = Bid(initialValue, 0);
        _winner = msg.sender;
        _counterStart = 2**256 - 1;
    }

    event AuctionStarted (address indexed owner, uint indexed value);
    event ValueChanged (uint indexed value);

    function getBid(address from) public view returns (uint, uint) {
        Bid memory bid = bids[from];
        return (bid.value, bid.counterValue);
    }

    function getWinner() public view returns (address) {
        return _winner;
    }
    // function getWinner() public view returns (address, uint) {
    //     return (_winner, bids[_winner].value);
    // }

    function getCounterStart() public view returns (uint) {
        return _counterStart;
    }

    function getCounterEnd() public view returns (uint) {
        return _counterEnd;
    }

    function _create(uint counterEnd) internal onlyOwner {
        _counterEnd = counterEnd;
    }

    function start(uint counterStart) public onlyOwner{
        _counterStart = counterStart;
    }

    function changeValue(uint value) public onlyOwner {
        Bid storage ownersBid = bids[msg.sender];
        ownersBid.value = value;
    }
}
