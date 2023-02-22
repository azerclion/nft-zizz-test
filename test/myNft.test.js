const mNft = artifacts.require("myNFT");

function ToWei(n) {
  return web3.utils.toWei(n, "ether");
}

contract("myNft", async ([deployer, user, user2]) => {
  let myNFT;
  before(async () => {
    myNFT = await mNft.new(
      "mynft",
      "symbol",
      10,
      /* global BigInt */
      1000_000_000_000_000_000n,
      15,
      15,
      "ipfs://QmTzHTBRmt84u81GDZbvRwArcxWVv9awBH9C7AMiZiWNWp"
    );
  });
  describe("myNFT deployment", async () => {
    it("myNFT has a name", async () => {
      const result = await myNFT.name();
      assert.equal(result, "mynft");
    });
    it("myNFT has a symbol", async () => {
      const result = await myNFT.symbol();
      assert.equal(result, "symbol");
    });
    it("myNFT has a limit", async () => {
      const result = await myNFT.limit();
      assert.equal(result, 10);
    });
    it("myNFT has a price", async () => {
      const result = await myNFT.price();
      assert.equal(result, 1000_000_000_000_000_000n);
    });
    it("myNFT has a interval", async () => {
      const result = await myNFT.interval();
      assert.equal(result, 15);
    });
    it("myNFT has a lastId", async () => {
      const result = await myNFT.latestId();
      assert.equal(result, 0);
    });
    // it("myNFT has a revelingBlock", async () => {
    //   const result = await myNFT.revelingBlock();
    //   assert.equal(Number(result), 15);
    // });
    it("myNFT has a notReveledNFTURI", async () => {
      const result = await myNFT.notReveledNFTURI();
      assert.equal(
        result,
        "ipfs://QmTzHTBRmt84u81GDZbvRwArcxWVv9awBH9C7AMiZiWNWp"
      );
    });
  });
  describe("myNFT functest", async () => {
    it("myNFT has a u_setPrice", async () => {
      await myNFT.u_setPrice(ToWei("0.01"));
      const result = await myNFT.price();
      assert.equal(result, 10_000_000_000_000_000n);
    });
    it("myNFT has a u_setPrice", async () => {
      await myNFT.u_setPrice(ToWei("0.01"));
      const result = await myNFT.price();
      assert.equal(result, 10_000_000_000_000_000n);
    });
    //
    it("myNFT has a mint", async () => {
      await myNFT.mint({
        from: user,
        value: web3.utils.toWei("0.01", "ether"),
      });
    });
    it("myNFT has a lastId", async () => {
      const result = await myNFT.latestId();
      assert.equal(result, 1);
    });
    it("myNFT has a mint", async () => {
      await myNFT.mint({
        from: user2,
        value: web3.utils.toWei("0.01", "ether"),
      });
    });
    it("myNFT has a lastId", async () => {
      const result = await myNFT.latestId();
      assert.equal(result, 2);
    });
    it("myNFT has a u_currentBalance", async () => {
      const result = await myNFT.u_currentBalance();
      assert.equal(Number(result), 20_000_000_000_000_000n);
      // 10_000_000_000_000_000n
    });
    it("myNFT has a u_withdraw", async () => {
      await myNFT.u_withdraw();
    });
    it("myNFT has a u_currentBalance", async () => {
      const result = await myNFT.u_currentBalance();
      assert.equal(Number(result), 0);
      // 10_000_000_000_000_000n
    });
  });
});
