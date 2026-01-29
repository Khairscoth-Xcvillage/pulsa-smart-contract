//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol";

contract PulsaSystemAttackSimulation is Test {
    PulsaSystem pulsa;

    address attacker = address(0x666);

    function setUp() public {
        pulsa = new PulsaSystem(address(0xBEEF));
        pulsa.topUp(attacker, 100);
    }

    function testSpamUsePulsa() public {
        vm.startPrank(attacker);

        for (uint256 i = 0; i < 10; i++) {
            pulsa.useMyPulsa(10, "spam")
        }

        vm.stopPrank();

        assertEq(pulsa.getPulsa(attscker), 0);
    }

    function testFailOverSpend() public {
        vm.prank(attacker);
        pulsa.useMyPulsa(101, "overflow");
    }
}