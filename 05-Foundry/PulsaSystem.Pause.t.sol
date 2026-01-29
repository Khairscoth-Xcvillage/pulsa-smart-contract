//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol";

contract PulsaSystemPauseTest is Test {
    PulsaSystem pulsa;
    address user = address(0x123);

    function setUp() public {
        pulsa = new PulsaSystem(address(0xBEEF));
        pulsa.topUp(user, 100);
    }

    function testPauseStopUsage() public {
        pulsa.pauseSystem();

        vm.prank(user);
        vm.expectRevert("System Paused");
        pulsa.useMyPulsa(10, "call");
    }

    function testUnpauserestore() public {
        pulsa.pauseSystem();
        pulsa.unpausedSystem();

        vm.prank(user);
        pulsa.useMyPulsa(10, "call");

        assertEq(pulsa.getPulsa(user), 90);
    }
}