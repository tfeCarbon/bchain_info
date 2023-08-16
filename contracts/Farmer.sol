// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Farmer {
    struct FarmerInfo {
        string name;
        string fatherName;
        string gender;
        uint256 dob;
        string mobileNumber;
        string aadharNumber;
        string resaddress;
        string district;
        string state;
        string signHash;
        address payable farmerAddress;
        bool registered;
    }

    mapping(string => FarmerInfo) public farmer;

    //mapping(address => FarmerInfo) public privateFarmer;

    function registerFarmer(
        string memory _name,
        string memory _fatherName,
        string memory _gender,
        uint256 _dob,
        string memory _mobileNumber,
        string memory _aadharNumber,
        string memory _address,
        string memory _district,
        string memory _state,
        string memory _signHash,
        string memory auth
    ) public payable {
        require(
            bytes(_name).length > 0 &&
                bytes(_fatherName).length > 0 &&
                bytes(_mobileNumber).length > 0 &&
                bytes(_aadharNumber).length > 0 &&
                bytes(_address).length > 0 &&
                bytes(_district).length > 0 &&
                bytes(_state).length > 0,
            "All fields must be filled"
        );
        require(!farmer[auth].registered, "Already registered");

        farmer[auth] = FarmerInfo({
            name: _name,
            fatherName: _fatherName,
            gender: _gender,
            dob: _dob,
            mobileNumber: _mobileNumber,
            aadharNumber: _aadharNumber,
            resaddress: _address,
            district: _district,
            state: _state,
            signHash: _signHash,
            farmerAddress: payable(msg.sender),
            registered: true
        });
    }

    function getSignatureHash(
        string memory auth
    ) public view returns (string memory) {
        require(msg.sender == farmer[auth].farmerAddress, "Not allowed");
        return farmer[auth].signHash;
    }

    function getUserAddress(string memory auth) public view returns (address) {
        return farmer[auth].farmerAddress;
    }

    function getFarmerInfo(
        string memory auth
    )
        public
        view
        returns (
            string memory name,
            string memory fatherName,
            string memory gender,
            uint256 dob,
            string memory mobileNumber,
            string memory aadharNumber,
            string memory resaddress,
            string memory district,
            string memory state,
            string memory signHash,
            address farmerAddress,
            bool registered
        )
    {
        FarmerInfo storage farmerInfo = farmer[auth];
        return (
            farmerInfo.name,
            farmerInfo.fatherName,
            farmerInfo.gender,
            farmerInfo.dob,
            farmerInfo.mobileNumber,
            farmerInfo.aadharNumber,
            farmerInfo.resaddress,
            farmerInfo.district,
            farmerInfo.state,
            farmerInfo.farmerAddress
        );
    }
}
