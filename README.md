# Getting Started with Create React App & truffle

nft minting page

```
yarn add @openzeppelin/contracts
```

```
    // _name : 토큰의 이름
    // _symbol : 토큰의 심볼
    // _limit : NFT 최대 발행 개수 10
    // _interval : NFT 민트 간격 (봇이 독점 방지) 15
    // _revelingBlock : 언제 NFT가 공개되는지 15
    // _notReveledNFTURI : 진짜 NFT를 공개 하기전의 그림의 메타데이터 즉 Cover.js URI
```

```
migrations.js

const myNft = artifacts.require("myNFT");

module.exports = async function (deployer) {
  await deployer.deploy(
    myNft,
    "TripEzAlbum",
    "zzz",
    31,
    /* global BigInt */
    10_000_000_000_000_000n,
    15,
    15,
    "ipfs://QmVPyQcLoAqTVvqtP9stNoENnztnjgQuQXyWyvaxznCD7U"
  );
};
```

```
test.js

    it("myNFT has a mint", async () => {
      await myNFT.mint({
        from: user,
        value: web3.utils.toWei("0.01", "ether"),
      });
    });

```

```
❯ ganache-cli
❯ truffle test
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


  Contract: myNft
    myNFT deployment
      ✔ myNFT has a name
      ✔ myNFT has a symbol
      ✔ myNFT has a limit
      ✔ myNFT has a price
      ✔ myNFT has a interval (40ms)
      ✔ myNFT has a lastId
      ✔ myNFT has a notReveledNFTURI
    myNFT functest
      ✔ myNFT has a u_setPrice (146ms)
      ✔ myNFT has a u_setPrice (329ms)
      ✔ myNFT has a mint (204ms)
      ✔ myNFT has a lastId
      ✔ myNFT has a mint (189ms)
      ✔ myNFT has a lastId
      ✔ myNFT has a u_currentBalance
      ✔ myNFT has a u_withdraw (87ms)
      ✔ myNFT has a u_currentBalance


  16 passing (2s)
```

```
❯ truffle migrate --network goerli --reset

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_myNft_migrations.js
=====================

   Deploying 'myNFT'
   -----------------
   > transaction hash:    0xcbe0e59c7d83b8fb57637728b0a0bc87e697c0565fdd1787c51143877435c01f
   > Blocks: 1            Seconds: 13
   > contract address:    0xf76e30C2179f613034A5cDe609235403f9c50De8
   > block number:        8533843
   > block timestamp:     1677031488
   > account:             0x56C53049a267d05578163706C3589D44061AD9A6
   > balance:             9.990818296157867878
   > gas used:            3634962 (0x377712)
   > gas price:           2.525942181 gwei
   > value sent:          0 ETH
   > total cost:          0.009181703842132122 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 8533844)
   > confirmation number: 2 (block: 8533845)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.009181703842132122 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.009181703842132122 ETH

```

```
const abi =[........];
const nftContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    "0xf76e30C2179f613034A5cDe609235403f9c50De8"
  );
};

export default nftContract;
```

1. change for zizz
2. change name & symbol & number limit
3. deploy again
4. change contract address
