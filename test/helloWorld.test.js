const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld contract", function () {
  let HelloWorld, hello, owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    hello = await HelloWorld.deploy("Привіт, Hardhat!");
    await hello.waitForDeployment();
  });  

  it("should return initial message", async function () {
    expect(await hello.message()).to.equal("Привіт, Hardhat!");
  });

  it("should update the message", async function () {
    // Виклик setMessage із іншого акаунту
    await hello.connect(addr1).setMessage("Нова повiдомлення");
    expect(await hello.message()).to.equal("Нова повiдомлення");
  });

  it("owner should still read new message", async function () {
    expect(await hello.connect(owner).message()).to.equal("Нова повiдомлення");
  });
});
