// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.5.0;

import './Tether.sol';
import './RWD.sol';

contract DecBank {
  string public name = 'Decentral Bank';
  address public owner;
  Tether public tether;
  RWD public rwd;

  address[] public stackers;

  mapping(address => uint) public stackingBalance;
  mapping(address => bool) public hasStacked;
  mapping(address => bool) public isStacking;

  constructor(RWD _rwd, Tether _tether) public {
    tether = _tether;
    rwd = _rwd;
  }

  // staking
  function deposit(uint _amount) public {
    require(_amount > 0, 'Amount must be more than 0');
    
    // transfer tether to this contract for staking
    tether.transferFrom(msg.sender, address(this), _amount);

    // update stacking balance
    stackingBalance[msg.sender] += _amount;

    if (!hasStacked[msg.sender]) {
      stackers.push(msg.sender);
    }

    // update
    isStacking[msg.sender] = true;
    hasStacked[msg.sender] = true;
  }
}