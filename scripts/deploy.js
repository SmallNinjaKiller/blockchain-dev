const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy("Привіт, блокчейн!");

  await hello.waitForDeployment();

  const address = await hello.getAddress();
  console.log(`✅ HelloWorld deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
