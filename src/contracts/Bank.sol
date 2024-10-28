// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.5.0;

import './Tether.sol';
import './RWD.sol';

contract DecBank {
  string public name = 'Decentral Bank';
  address public owner;
  Tether public tether;
  RWD public rwd;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(RWD _rwd, Tether _tether) public {
    owner = msg.sender;
    tether = _tether;
    rwd = _rwd;
  }

  // staking
  function deposit(uint _amount) public {
    require(_amount > 0, 'Amount must be more than 0');
    
    // transfer tether to this contract for staking
    tether.transferFrom(msg.sender, address(this), _amount);

    // update stacking balance
    stakingBalance[msg.sender] += _amount;

    if (!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    // update
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  // issue rewards
  function issueTokens() public {
    require(msg.sender == owner, 'Caller must be the owner');

    for(uint i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint amount = stakingBalance[recipient] / 9;
      rwd.transfer(recipient, amount);
    }
  }

  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];

    require(balance > 0, 'Staking balance must be more than zero');

    // transfer tokens to the contract
    tether.transfer(msg.sender, balance);

    stakingBalance[msg.sender] = 0;
    isStaking[msg.sender] = false;
  }
}