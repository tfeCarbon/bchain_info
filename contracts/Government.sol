// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Government {
    struct Govt {
        string govid;
        string email;
        string district;
        string state;
        string signHash;
        address agentAddress;
        bool registered;
    }

    mapping(address => Govt) public agent;

    function registerFarmer(
        string memory _govid,
        string memory _email,
        string memory _district,
        string memory _signHash,
        string memory _state
    ) public {
        require(
            bytes(_govid).length > 0 &&
                bytes(_email).length > 0 &&
                bytes(_district).length > 0 &&
                bytes(_state).length > 0,
            "All fields must be filled"
        );
        require(!agent[msg.sender].registered, "Already registered");

        agent[msg.sender] = Govt({
            govid: _govid,
            email: _email,
            district: _district,
            state: _state,
            agentAddress: msg.sender,
            signHash: _signHash,
            registered: true
        });
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == agent[msg.sender].agentAddress, "Not allowed");

        return agent[msg.sender].signHash;
    }

    function getUserAddress() public view returns (address) {
        return agent[msg.sender].agentAddress;
    }
}
