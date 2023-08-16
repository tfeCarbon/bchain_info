// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Insurance {
    struct InsComp {
        string companyName;
        string email;
        uint256 interestRate;
        string policyNumber;
        address payable companyAddress;
        string signHash;
        bool registered;
    }

    mapping(address => InsComp) public company;

    function signUp(
        string memory _companyName,
        string memory _email,
        uint256 _interestRate,
        string memory _signHash,
        string memory _policyNumber
    ) public {
        require(
            bytes(_companyName).length > 0 &&
                bytes(_email).length > 0 &&
                _interestRate > 0.00 &&
                bytes(_policyNumber).length > 0,
            "All fields must be filled"
        );
        require(!company[msg.sender].registered, "Already registered");

        company[msg.sender] = InsComp({
            companyName: _companyName,
            email: _email,
            interestRate: _interestRate,
            policyNumber: _policyNumber,
            companyAddress: payable(msg.sender),
            signHash: _signHash,
            registered: true
        });
    }

    function getSignatureHash() public view returns (string memory) {
        require(
            msg.sender == company[msg.sender].companyAddress,
            "Not allowed"
        );

        return company[msg.sender].signHash;
    }

    function getUserAddress() public view returns (address) {
        return company[msg.sender].companyAddress;
    }
}
