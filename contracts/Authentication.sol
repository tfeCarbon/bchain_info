// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Authentication {
    uint256 public nbOfUsers;

    struct User {
        string signatureHash;
        address userAddress;
    }

    mapping(address => User) private user;

    constructor() {
        nbOfUsers = 0;
    }

    function register(string memory _signature) public {
        require(
            user[msg.sender].userAddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );

        user[msg.sender].signatureHash = _signature;
        user[msg.sender].userAddress = msg.sender;
        nbOfUsers++;
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].userAddress, "Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }
}

// 0x8427F3f57eDA4E0bF7F54397273cC9c70691fb9D
