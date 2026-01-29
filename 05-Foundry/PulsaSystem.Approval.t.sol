//SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol";

contract PulsaSystemApprovalTest is Test {
    PulsaSystem pulsa;

    address user = address(0x123);
    address admin;

    function setUp() public {
        pulsa = new PulsaSystem(address(0xBEEF));
        admin = pulsa.admin();

        pulsa.topUp(user, 200);
    }

    function testApprovalAndDeduct() public {
        vm.prank(user);
        pulsa.approve(admin, 100);

        pulsa.deductpulsaWithApproval(user, 50, "billing");

        assertEq(pulsa.getPulsa(user), 150);
        assertEq(pulsa.allowance(user, admin), 50);
    }

    function testFailDeductWithoutApproval() public {
        pulsa.deductpulsaWithApproval(user, 1, "illegal");
    }
}
