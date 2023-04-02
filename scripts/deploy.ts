import { ethers } from "hardhat";

async function main() {
 

  const MyTokens = await ethers.getContractFactory("MyTokens");
  const myTokens = await MyTokens.deploy();

  await myTokens.deployed();

  console.log(
    `MyTokens smart contract is deployed to  ${myTokens.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
