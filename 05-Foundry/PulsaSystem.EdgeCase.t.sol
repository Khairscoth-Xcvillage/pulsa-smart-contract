//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol";

contract PulsaSystemEdgeCaseTest is Test {
    PulsaSystem pulsa;
    address user = address(0x123);

    function setUp() public {
        pulsa = new PulsaSystem(address(0xBEEF));
    }

    function testFailUseZeroBalance() public {
        vm.prank(user);
        pulsa.useMyPulsa(1, "spam");
    }

    function testApproveOverwrite() public {
        vm.prank(user);
        pulsa.approve(address(this), 100);

        vm.prank(user);
        pulsa.approve(address(this), 50);

        assertEq(pulsa.allowance(user, address(this)), 50);
    }
}