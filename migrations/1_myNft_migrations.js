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
