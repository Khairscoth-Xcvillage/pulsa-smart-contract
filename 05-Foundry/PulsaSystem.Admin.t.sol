//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PulsaSystem.sol"

contract PulsaSystemAdminTest is Test {
    PulsaSystem pulsa;

    address recovery = address(0xBEEF);
    address newAdmin = address(0xCAFE);

    function setUp() public {
        pulsa = new PulsaSystem(recovery);
    }

    function testRecoverAdmin() public {
        vm.prank(recovery);
        pulsa.recoverAdmin(newAdmin);

        assertEq(pulsa.admin(), newAdmin);
    }

    function testFailRecoverByNonRecovery() public {
        vm.prank(aaddress(0xBAD));
        pulsa.recoverAdmin(newAdmin)
    }
}