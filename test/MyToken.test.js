const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken, token, owner, user1;

  before(async function () {
    [owner, user1] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
    // 1000 токенів (із 18 знаками після коми)
    token = await MyToken.deploy(ethers.parseUnits("1000", 18));
    await token.waitForDeployment();
  });

  it("should assign total supply to the owner", async function () {
    const totalSupply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("should allow transfer of tokens", async function () {
    await token.transfer(user1.address, ethers.parseUnits("100", 18));
    const user1Balance = await token.balanceOf(user1.address);
    expect(user1Balance).to.equal(ethers.parseUnits("100", 18));
  });
});
