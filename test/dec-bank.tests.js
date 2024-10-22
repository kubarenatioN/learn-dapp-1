const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecBank = artifacts.require('DecBank');

require('chai').use(require('chai-as-promised')).should();

contract('decBank', accounts => {
  let tether, rwd, decBank;

  function tokens(number) {
    return web3.utils.toWei(String(number), 'ether');
  }

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    rwd = await RWD.new();
    decBank = await DecBank.new(rwd.address, tether.address);

    // transfer 1 mil RWD to dec bank
    await rwd.transfer(decBank.address, tokens(1e6))

    // transfer 100 tethers to dec bank
    await tether.transfer(accounts[1], tokens(100), { 
      from: accounts[0]
    })
  })

  describe('Mock Tether deployment', async () => {
    it('should match name', async () => {
      const name = await tether.name();

      assert.equal(name, 'Tether');
    })
  })

  describe('RWD Token', async () => {
    it('should match name', async () => {
      const name = await rwd.name();

      assert.equal(name, 'Reward Token');
    })
  })

  describe('Decentral Bank', async () => {
    it('should match name', async () => {
      const name = await decBank.name();

      assert.equal(name, 'Decentral Bank');
    })

    it('should have tokens', async () => {
      const balance = await rwd.balances(decBank.address);

      assert.equal(balance, tokens(1e6));
    })
  })
})