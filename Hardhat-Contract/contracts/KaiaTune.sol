// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// change the contract from ERC721 to running normal contract 

contract KaiaTune is Ownable, ReentrancyGuard {
    uint256 private _musicIdCounter;
    uint256 public constant MINT_FEE = 2 ether; // 2 KAIA
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 30; // 30% platform fee

    struct Music {
        string name;
        string category;
        string bannerImage;
        string musicFile;
        uint256 price; // Stored in wei
        address creator;
    }

    mapping(uint256 => Music) public musicInfo;
    mapping(uint256 => mapping(address => bool)) public musicOwners;
    uint256 public totalFeesCollected;

    event MusicMinted(uint256 musicId, address creator, uint256 valueSent);
    event MusicBought(uint256 musicId, address buyer, uint256 price, uint256 valueSent);
    event FundsWithdrawn(address owner, uint256 amount);
    event DepositFailed(string reason);

    constructor() Ownable(msg.sender) {
        // Owner is set to the deployer (msg.sender)
    }

    receive() external payable {
        emit DepositFailed("Receive function triggered, but no logic implemented");
    }

    fallback() external payable {
        emit DepositFailed("Fallback function triggered, but no logic implemented");
    }

    function mintMusic(
        string memory name,
        string memory category,
        string memory bannerImage,
        string memory musicFile,
        uint256 price // Input in ether, converted to wei
    ) external payable nonReentrant {
        require(msg.value == MINT_FEE, "Incorrect mint fee");
        _musicIdCounter++;
        uint256 musicId = _musicIdCounter;
        Music storage music = musicInfo[musicId];
        music.name = name;
        music.category = category;
        music.bannerImage = bannerImage;
        music.musicFile = musicFile;
        music.price = price * 1 ether; // Convert ether to wei
        music.creator = msg.sender;
        musicOwners[musicId][msg.sender] = true;
        totalFeesCollected += msg.value;
        emit MusicMinted(musicId, msg.sender, msg.value);
    }

    function buyMusic(uint256 musicId) external payable nonReentrant {
        Music storage music = musicInfo[musicId];
        require(music.price > 0, "Music not for sale");
        require(msg.value == music.price, "Incorrect price");
        require(!musicOwners[musicId][msg.sender], "Already owned");
        uint256 platformFee = (music.price * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorAmount = music.price - platformFee;
        totalFeesCollected += platformFee;

        (bool successCreator, ) = payable(music.creator).call{value: creatorAmount}("");
        require(successCreator, "Transfer to creator failed");
        musicOwners[musicId][msg.sender] = true;
        emit MusicBought(musicId, msg.sender, music.price, msg.value);
    }

    function withdrawFunds() external onlyOwner nonReentrant {
        uint256 amount = totalFeesCollected;
        require(amount > 0, "No funds to withdraw");
        totalFeesCollected = 0;
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Withdrawal failed");
        emit FundsWithdrawn(owner(), amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function deposit() external payable {
        emit DepositFailed("Deposit received, but no logic implemented");
    }
}