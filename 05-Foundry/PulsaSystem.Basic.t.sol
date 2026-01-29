//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol";

contract PulsaSystemBasicTest is Test {
    PulsaSystem pulsa;

    address admin = address(this);
    address recovery = address(0xBEEF);
    address user = address(0x123);
    function setUp() public {
    pulsa = new PulsaSystem(recovery);
}

function testInitialState() public {
    assertEq(pulsa.admin(), admin);
    assertEq(pulsa.recoveryAdmin(), recovery);
    assertFalse(pulsa.paused());
    assertEq(pulsa.totalSupply(), 0);
}

function testTopUpSuccess() public {
    pulsa.topUp(user, 100);
    assertEq(pulsa.getPulsa(user), 100);
    assertEq(pulsa.totalSupply(), 100);
}

function testFailTopUpOverMaxSupply() public {
    pulsa.topUp(user, pulsa.MAX_SUPPLY() +1);
}
}

