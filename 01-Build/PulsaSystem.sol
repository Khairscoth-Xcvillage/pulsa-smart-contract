//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract pulsaSystem {
    //================
    //PERTAMA : STATE
    //================

    address public admin;
    bool public paused;

    mapping(address => uint256) private pulsaBalance;

    //=====================
    //KEDUA : LOG AKTIVITAS
    //=====================

    event TopUp(address indexed user, uint256 amount);
    event PulsaUsed(address indexed user, uint256 amount);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    event Paused();
    event Unpaused();

    //===================
    //KETIGA : MODIFIER
    //===================

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Admin");
        _;
    }
    modifier whenNotPaused() {
        require(!paused, "System paused");
        _;
    }

    //=====================
    //KEEMPAT : CONSTRUCTOR
    //=====================

    constructor() {
        admin = msg.sender;
    }

    //======================
    //KELIMA : WRITE (LOGIC)
    //======================

    //Admin menambah pulsa user
    function topUp(address user, uint256 amount)
    external
    onlyAdmin
    whenNotPaused
{
    require(user != address(0), "Invalid User");
    require(amount > 0, "Invalid Amount");

    pulsaBalance[user] += amount;
    emit TopUp(user, amount);
}
//User memakai pulsa sendiri
function useMyPulsa(uint256 amount)
    external
    whenNotPaused
{
    require(amount > 0, "Invalid Amount");
    require(pulsaBalance[msg.sender] >= amount, "Insufficient pulsa");

    pulsaBalance[msg.sender] -= amount;
    emit PulsaUsed(msg.sender, amount);
}
//Admin memotong pulsa user (billing sistem)
function deductPulsa(address user, uint256 amount)
    external
    onlyAdmin
    whenNotPaused
{
    require(amount > 0, "Invalid Amount");
    require(pulsaBalance[user] >= amount, "Insufficient pulsa");

    pulsaBalance[user] -=amount;
    emit PulsaUsed(user, amount);
}
//=============================
//KEENAM : ADMIN CONTROL
//=============================

function pauseSystem() external onlyAdmin{
    paused = true;
    emit Unpaused();
}

function changeAdmin(address newAdmin) external onlyAdmin {
    require(newAdmin  != address(0), "Invalid Admin");

    address oldAdmin = admin;
    admin = newAdmin;

    emit AdminChanged(oldAdmin, newAdmin);
}
//===============================
//KETUJUH : READ (VIEW)
//===============================
function myPulsa() external view returns(uint256) {
    return pulsaBalance[msg.sender];
}

function getPulsa(address user) external view returns (uint256) {
    return pulsaBalance[user];
}
}