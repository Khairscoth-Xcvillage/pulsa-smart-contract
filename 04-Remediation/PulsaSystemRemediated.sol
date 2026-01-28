//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PulsaSystem {
    //================
    //PERTAMA: IDENTITAS DAN VERSI
    //================
     
     string public constant VERSION = "PulsaSystem v1.1-remidiated";

    //================
    //KEDUA: ROLE & RECOVERY
    //================

    address public admin;
    address public recoveryAdmin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Admin");
        _;
    }

    //=================
    //KETIGA: STATE UTAMA
    //=================

    bool public paused;

    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 1_000_000;

    mapping(address => uint256) private pulsaBalance;

    //allowance: user memberi izin admin menggunakan pulsa
    mapping(address => mapping(address => uint256)) public allowance;

    //==================
    //KEEMPAT: EVENTS (JELAS & TIDAK AMBIGU)
    //==================

    event Paused(address indexed by);
    event Unpaused(address indexed by);

    event PulsaMinted(address indexed to, uint256 amount);
    event PulsaUsedByUser(address indexed user, uint256 amount, string sevice);
    event PulsaUsedByAdmin(address indexed user, uint256 amount, string reason);

    event Approval(address indexed owner, address indexed spander, uint256 amount);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    //===================
    //KELIMA: MODIFIER SYSTEM
    //===================

    modifier whenNotPaused() {
        require(!paused, "System Paused");
        _;
    }

    //====================
    //KEENAM: CONSTRUTOR
    //====================

    constructor(address _recoveryAdmin) {
        require(_recoveryAdmin != address(0), "Invalid recovery admin");

        admin = msg.sender;
        recoveryAdmin = _recoveryAdmin;
    }

    //=====================
    //KETUJUH: PAUSE & EMERGENCY CONTROL
    //=====================

    function pauseSystem() external onlyAdmin {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpausedSystem() external onlyAdmin {
        paused = false;
        emit Unpaused(msg.sender);
    }

    //======================
    //KEDELAPAN: ADMIN RECOVERY
    //======================

    function recoverAdmin(address newAdmin) external {
        require(msg.sender == recoveryAdmin, "Not recovery admin");
        require(newAdmin != address(0), "Invalid admin");

        address oldAdmin = admin;
        admin = newAdmin;

        emit AdminChanged(oldAdmin, newAdmin);
    }

    //=======================
    //KESEMBILAN: TOP UP (DENGAN SUPPLY CAP)
    //=======================

    function topUp(address user, uint256 amount)
        external
        onlyAdmin
        whenNotPaused
    {
        require(user != address(0), "Invalid user");
        require(totalSupply + amount <= MAX_SUPPLY, "Max supply reached");

        pulsaBalance[user] += amount;
        totalSupply += amount;

        emit PulsaMinted(user, amount);
    }

    //=========================
    //KESEPULUH: USER CONSENT (APPROVAL)
    //=========================

    function approve(address spender, uint256 amount)
        external
        whenNotPaused
    {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    //=========================
    //KESEBELAS: PENGGUNAAN PULSA OLEH USER
    //=========================

    function useMyPulsa(uint256 amount, string calldata service)
        external
        whenNotPaused
    {
        require(pulsaBalance[msg.sender] >= amount, "Insufficient balance");
        pulsaBalance[msg.sender] -= amount;
        emit PulsaUsedByUser(msg.sender, amount, service);
    }

    //==========================
    //KEDUABELAS: PENGGUNAAN PULSA OLEH ADMIN (DENGAN IZIN)
    //==========================

    function deductpulsaWithApproval (
        address user,
        uint256 amount,
        string calldata reason
    )
        external
        onlyAdmin
        whenNotPaused
    {
        require(allowance[user][msg.sender] >= amount, "No consent");
        require(pulsaBalance[user] >= amount, "Insufficient balance");

        allowance[user][msg.sender] -= amount;
        pulsaBalance[user] -= amount;

        emit PulsaUsedByAdmin(user, amount, reason);
    }

    //==============================
    //KETIGABELAS: READ (MINIMAL & AMAN)
    //==============================

    function getPulsa(address user) external view returns (uint256) {
        return pulsaBalance[user];
    }
}