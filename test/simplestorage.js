const MyToken = artifacts.require("./MyToken.sol");

contract("MyToekn", accounts => {
  it("...should be deployed", async () => {
    const myTokenInstance = await MyToken.deployed();
  });
});
