// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {
    uint price = 0.1 ether;
    uint constant FAN = 0;
    uint constant OKO = 1;
    uint constant POTIONS = 2;
    uint constant PLEX = 3;

    constructor() ERC1155("https://ipfs.io/ipfs/QmZQjSU6e4A3WNty7NnAbvcZEpbFRCZxKAwVwqPvKF3GrP/0.json") {
        _mint(msg.sender, FAN, 1, "");
        _mint(msg.sender, OKO, 100, "");
        _mint(msg.sender, POTIONS, 50, "");
        _mint(msg.sender, PLEX, 25, "");
    }

    // modifier verifyAmount(uint amount) {
    //     require (msg.value >= amount * price);
    //     _;
    // }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPrice(uint _price) public onlyOwner {
        price = _price;
    }
    
    function mint(uint256 id, uint256 amount)
        public
        payable 
    {
        // require(msg.value == price);
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "Balance is 0");
        (bool sent, bytes memory data) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    function hello() public pure returns(string memory) {
        return "hello world";
    }
}

// Mumbai Polygon address: 0xaeCc8F00CB9f370e1D0BA8f4D8417F31c554A692