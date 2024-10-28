const DecBank = artifacts.require('DecBank');

module.exports = async function() {
  let decBank = await DecBank.deployed();

  await decBank.issueTokens();

  console.log('Tokens have beed issued successfuly.');

  callback();
}