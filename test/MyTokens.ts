import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  // and reset Hardhat Network to that snapshot in every test.
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,

  describe("should create all the tokens", function () {
    describe("#mint",()=>{
      it("all the tokens should be at the owner address", async () => {
        const [owner] = await ethers.getSigners();
        const MyTokens = await ethers.getContractFactory("MyTokens");
        const myTokens = await MyTokens.deploy();
        await myTokens.deployed();
              expect(await myTokens.balanceOf(owner.address, 0)).to.equal(1000);
      });
    });
    describe("#ids", () => {
      it("should get the ids", async () => {
        const MyTokens = await ethers.getContractFactory("MyTokens");
        const myTokens = await MyTokens.deploy();
        await myTokens.deployed();
        expect(await myTokens.WIZARD()).to.equal(5);
      });
    });
    describe("#transfer", () => {
      it("owner should be able to  transfer the tokens", async () => {
        const [owner,otherAddress] = await ethers.getSigners();

        const MyTokens = await ethers.getContractFactory("MyTokens");
        const myTokens = await MyTokens.deploy();
        await myTokens.deployed();
        const tokenId =1;
        const tokenAmount =10
        await myTokens.transferTokens(
          owner.address,
          otherAddress.address,
          tokenId,
          tokenAmount,
          ""
        );
        expect(await myTokens.balanceOf(otherAddress.address,tokenId)).to.equal(tokenAmount);
      });
       it("owner should be able to  transfer the tokens in batch", async () => {
         const [owner, otherAddress] = await ethers.getSigners();

         const MyTokens = await ethers.getContractFactory("MyTokens");
         const myTokens = await MyTokens.deploy();
         await myTokens.deployed();
         const tokenIds = [0,1,2];
         const tokenAmounts = [10,20,30];
         await myTokens.transferTokensInBatch(
           owner.address,
           otherAddress.address,
           tokenIds,
           tokenAmounts,
           ""
         );
         expect(
           await myTokens.balanceOf(otherAddress.address, tokenIds[0])
         ).to.equal(tokenAmounts[0]);
       });
    });

    
  });


});
