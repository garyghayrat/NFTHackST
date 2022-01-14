// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

 /// @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] 
 /// Non-Fungible Token Standard, including the Metadata extension

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
 
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTHack is ERC721, Ownable {
  address payable public _owner;
  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;

  event Purchase(address owner, uint price, uint id, string uri);

  constructor() ERC721("NFTHack", "NHST") {
  	_owner = msg.sender;
  }

  function mint(string memory _tokenURI, uint _price) public onlyOwner returns (bool) {
    uint _tokenId = totalSupply() + 1;
    price[_tokenId] = _price;

    _mint(address(this), _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    
    return true;
  }

  function buy(uint _id) external payable {
    _validate(_id); /// check req. for trade
    _trade(_id); /// swap nftHack for eth
    
    emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
  }

  function _validate(uint _id) internal {
  	require(_exists(_id), "Error, wrong Token id"); /// not exists
    require(!sold[_id], "Error, Token is sold"); /// already sold
    require(msg.value >= price[_id], "Error, Token costs more"); /// costs more
  }

  function _trade(uint _id) internal {
  	_transfer(address(this), msg.sender, _id); /// NFTHack to user
  	_owner.transfer(msg.value); /// eth to owner
  	sold[_id] = true; /// NFTHack is sold
  }
}


/// Rinkeby address: 