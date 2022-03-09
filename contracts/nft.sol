pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    mapping(address => uint) public tokenCount;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Demon Tokens", "Demon"){
        contractAddress = marketplaceAddress;
    }


    function getTokenCount() public view returns (uint256){
        return _tokenIds.current();
        //return block.timestamp;
    }
    function createToken(string memory tokenURI) public returns (uint){
        
        tokenCount[msg.sender]++;
        //require(tokenCount[msg.sender] < 9, 'each address can only mint up to 8 tokens'); 
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}