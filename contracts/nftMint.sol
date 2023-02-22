//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myNFT is ERC721Enumerable, Ownable {
    
    error WaitForACoupleOfBlocks(uint tillBlock, uint currentBlock);
    error InsufficientValue(uint paidPrice, uint price);
    error OutOfNfts();
    error FailedToWithdraw();

   
    uint public limit;
    uint public latestId;
    uint public price;
    uint public interval;
    uint public revelingBlock;
    string public notReveledNFTURI;

    mapping(address=>uint) public NumberTracker; 

    using Strings for uint; 

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint _limit, 
        uint _price, 
        uint _interval,
        uint _revelingBlock,
        string memory _notReveledNFTURI
    ) ERC721(_name, _symbol) 
    {
        limit = _limit;
        price = _price;
        interval = _interval;
        revelingBlock = _revelingBlock + block.number;
        notReveledNFTURI = _notReveledNFTURI;
    }
    // _limit : NFT 최대 발행 개수 10 
    // _interval : NFT 민트 간격 (봇이 독점 방지) 15
    // _revelingBlock : 언제 NFT가 공개되는지 15
    // _notReveledNFTURI : 진짜 NFT를 공개 하기전의 그림의 메타데이터 즉 Cover.js URI 

    receive() external payable{
       mint();
    }

    function mint() public payable {
        if(NumberTracker[msg.sender] == 0 ? false : NumberTracker[msg.sender] + interval >= block.number) {
            revert WaitForACoupleOfBlocks(NumberTracker[msg.sender] + interval,block.number);
        }
        if(price != msg.value) {
            revert InsufficientValue(msg.value, price);
        }
        if(latestId >= limit) {
            revert OutOfNfts();
        }
        ++latestId;
        _safeMint(msg.sender,latestId);
        NumberTracker[msg.sender] = block.number;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        if(revelingBlock <= block.number){
            string memory baseURI = _baseURI();
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : "";
        }else{
            return notReveledNFTURI;
        }
    }

    // ipfs://____ / 뒤에 슬래쉬 꼭 필요!!!
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmbMxuqsU4tCjBynUZsqEGw6TAmuiH5t2GDpoTduT7PjFz/";
    }

    //NFT 판매 가격 변경하는 함수
    function u_setPrice(uint _price) external onlyOwner()  {
        price = _price;
    } 

    //NFT 민트할 수 있는 간격 정하는 함수
    function u_setInterval(uint _interval) external onlyOwner(){
        interval = _interval;
    } 

    //NFT 실제 그림 몇 번째 블록에서 공개하는지 정하는 함수  
    function u_setRevelingBlock(uint _revelingBlock) external onlyOwner(){
        revelingBlock = _revelingBlock + block.number;
    } 
     
    //얼마후 NFT 실제 그림 공개하는지 보여주는 함수
    function u_whenToRevelNFTs() external view returns(uint) {
       return revelingBlock <= block.number  ? 0 : revelingBlock - block.number ;
    } 
   
    // 현재 NFT 판매금액
    function u_currentBalance() external view returns(uint) {
      return address(this).balance;
    }
    
    // 판매금액 출금하기
    function u_withdraw() external onlyOwner() {
      (bool _result,) = address(msg.sender).call{value:address(this).balance}("");
      if(!_result) revert FailedToWithdraw();
    }

}