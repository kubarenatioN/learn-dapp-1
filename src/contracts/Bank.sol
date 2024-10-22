// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.5.0;

import './Tether.sol';
import './RWD.sol';

contract DecBank {
  string public name = 'Decentral Bank';
  address public owner;
  Tether public tether;
  RWD public rwd;

  constructor(RWD _rwd, Tether _tether) public {
    tether = _tether;
    rwd = _rwd;
  }
}