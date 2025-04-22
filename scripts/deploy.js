const { ethers } = require("hardhat");

async function main() {
  const initialSupply = ethers.parseEther("1000"); // 1000 токенів

  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ Token deployed at: ${address}`);

  // Додатково мінтимо 500 токенів для себе
  const mintAmount = ethers.parseEther("500");
  const tx = await token.mint(deployer.address, mintAmount);
  await tx.wait();
  console.log(`✅ Minted additional 500 tokens to ${deployer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});