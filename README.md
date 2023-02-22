# Getting Started with Create React App & truffle

nft minting page

```
yarn add @openzeppelin/contracts
```

```
UPDATE

base URI in solidity
revealPic URI in constructor at migration file

deploy
change contract address in abi folder
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
> Compiling ./contracts/nftMint.sol
> Compiling @openzeppelin/contracts/access/Ownable.sol
> Compiling @openzeppelin/contracts/token/ERC721/ERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721Receiver.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
> Compiling @openzeppelin/contracts/utils/Address.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Compiling @openzeppelin/contracts/utils/Strings.sol
> Compiling @openzeppelin/contracts/utils/introspection/ERC165.sol
> Compiling @openzeppelin/contracts/utils/introspection/IERC165.sol
> Compiling @openzeppelin/contracts/utils/math/Math.sol
> Artifacts written to /Users/namhyeongseog/Desktop/PLATENO/zizzNFTmint/build/contracts
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang


Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_myNft_migrations.js
=====================

   Replacing 'myNFT'
   -----------------
   > transaction hash:    0x4789288e4e7a261d87685843b0bfcdfbdf47c1b6b55b8f8de7adb0e91d133c79
   > Blocks: 1            Seconds: 17
   > contract address:    0xB48458e243B024DB46053C2B8Ee34facc866f4b0
   > block number:        8533983
   > block timestamp:     1677033732
   > account:             0x56C53049a267d05578163706C3589D44061AD9A6
   > balance:             9.970486603417790034
   > gas used:            3635034 (0x37775a)
   > gas price:           2.709235874 gwei
   > value sent:          0 ETH
   > total cost:          0.009848164516009716 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 8533984)
   > confirmation number: 2 (block: 8533985)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.009848164516009716 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.009848164516009716 ETH

```

```
const abi =[........];
const nftContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    "0xB48458e243B024DB46053C2B8Ee34facc866f4b0"
  );
};

export default nftContract;
```
