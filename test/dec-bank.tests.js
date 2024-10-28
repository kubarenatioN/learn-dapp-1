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
  });

  describe('Yield Farming', async () => {
    it('rewards tokens for stacking', async () => {
      let result;

      result = await tether.balances(accounts[1]);
      assert.equal(result, tokens(100));

      // check approval and deposit
      await tether.approve(decBank.address, tokens(100), {
        from: accounts[1]
      });

      await decBank.deposit(tokens(100), {
        from: accounts[1]
      });

      // check updated balance
      result = await tether.balances(accounts[1]);
      assert.equal(result, tokens(0));

      const decBankBalance = await tether.balances(decBank.address);
      assert.equal(decBankBalance, tokens(100));

      result = await decBank.isStaking(accounts[1]);
      assert.equal(result, true);

      await decBank.issueTokens({ from: accounts[0] });

      await decBank.issueTokens({ from: accounts[1] }).should.be.rejected;

      await decBank.unstakeTokens({ from: accounts[1] })

      // check unstaking
      result = await tether.balances(accounts[1])
      assert.equal(result.toString(), tokens(100))

      result = await tether.balances(decBank.address);
      assert.equal(result, tokens(0));

      result = await decBank.isStaking(accounts[1]);
      assert.equal(result, false);
    })

  })
})