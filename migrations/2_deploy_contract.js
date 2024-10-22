const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecBank = artifacts.require('DecBank');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecBank, rwd.address, tether.address);
  const decBank = await DecBank.deployed();

  // transfer 1 million RWD tokens to Bank
  await rwd.transfer(decBank.address, String(1e18) + String(1e6).slice(1));

  // distribute 100 Tether tokens to investors
  const investor_acc = accounts[1]
  await tether.transfer(investor_acc, String(1e18))
}