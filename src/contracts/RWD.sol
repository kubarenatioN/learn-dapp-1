// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.5.0;

contract RWD {
  string public name = 'Reward Token';
  string public symbol = 'RWD';
  uint public totalSupply = 1e18 * 1e6; // 1 million tokens
  uint8 public decimals = 18;

  event Transfer(address indexed _from, address indexed _to, uint amount);

  event Approval(address indexed _owner, address indexed _spender, uint amount);

  mapping(address => uint) public balances;

  mapping(address => mapping(address => uint)) public allowance;

  constructor() public {
    balances[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);

    balances[msg.sender] -= _value;
    balances[_to] += _value;
    
    emit Transfer(msg.sender, _to, _value);
    
    return true;
  }

  function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
    require(balances[_from] >= _value);
    require(allowance[_from][msg.sender] >= _value);
    // require(allowance[msg.sender][_from] >= _value); // is it correct?

    balances[_to] += _value;
    balances[_from] -= _value;

    allowance[msg.sender][_from] -= _value;

    emit Transfer(_from, _to, _value);

    return true;
  }

  function approve(address _spender, uint _value)  public returns (bool success) {
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
  }
}