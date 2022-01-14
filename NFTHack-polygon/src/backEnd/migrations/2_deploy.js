const NFTHack = artifacts.require("NFTHack");

module.exports = async(deployer) => {
  await deployer.deploy(NFTHack);
};