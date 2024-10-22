// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.5.0;

contract Migrations {
  address public owner;
  uint public last_compiled_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function setCompleted(uint completed) public onlyOwner {
    last_compiled_migration = completed;
  }

  function upgrade(address new_addr) public onlyOwner {
    Migrations upgraded = Migrations(new_addr);
    upgraded.setCompleted(last_compiled_migration);
  }
}