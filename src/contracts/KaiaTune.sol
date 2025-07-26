// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KaiaTune is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public constant MINT_FEE = 2 ether; // 2 Kaia
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 30; // 30%

    struct Music {
        string name;
        string category;
        string bannerImage;
        string musicFile;
        uint256 price;
        address creator;
        mapping(address => bool) owners;
    }

    mapping(uint256 => Music) public musicInfo;

    event MusicMinted(uint256 tokenId, address creator);
    event MusicBought(uint256 tokenId, address buyer, uint256 price);

    constructor() ERC721("KaiaTune", "KTN") {}

    function mintMusic(
        string memory name,
        string memory category,
        string memory bannerImage,
        string memory musicFile,
        uint256 price
    ) public payable {
        require(msg.value == MINT_FEE, "Incorrect mint fee");
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        Music storage music = musicInfo[tokenId];
        music.name = name;
        music.category = category;
        music.bannerImage = bannerImage;
        music.musicFile = musicFile;
        music.price = price;
        music.creator = msg.sender;
        music.owners[msg.sender] = true;
        emit MusicMinted(tokenId, msg.sender);
    }

    function buyMusic(uint256 tokenId) public payable {
        Music storage music = musicInfo[tokenId];
        require(music.price > 0, "Music not for sale");
        require(msg.value == music.price, "Incorrect price");
        require(!music.owners[msg.sender], "Already owned");
        uint256 platformFee = (music.price * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorAmount = music.price - platformFee;
        payable(music.creator).transfer(creatorAmount);
        payable(owner()).transfer(platformFee);
        music.owners[msg.sender] = true;
        _transfer(music.creator, msg.sender, tokenId);
        emit MusicBought(tokenId, msg.sender, music.price);
    }
}