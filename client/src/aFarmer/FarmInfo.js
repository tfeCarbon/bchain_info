import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {useLocation} from 'react-router-dom';
import contractBuild from '../contracts/Farmer.json';
import {format} from 'date-fns';

const contractABI = contractBuild.abi;
const contractAddress = contractBuild.networks['5777'].address;
await window.ethereum.enable();
const web3 = new Web3(window.ethereum);

const FarmerInfo = () => {
    const location = useLocation();
    const [contract, setContract] = useState(null);
    const [farmerInfo, setFarmerInfo] = useState(null);
    const [hash, setHash] = useState('');

    useEffect(() => {
        async function initialize() {
            // Check if MetaMask is installed and available
            if(window.ethereum) {
                try {
                    // Create contract instance
                    const contractInstance = new web3.eth.Contract(
                        contractABI,
                        contractAddress
                    );
                    console.log(contractAddress);
                    setContract(contractInstance);
                } catch(error) {
                    console.error('Error initializing Web3:', error);
                }
            } else {
                console.error('MetaMask not detected');
            }
        }

        initialize();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hash1 = searchParams.get('hash');
        setHash(hash1);
        console.log(hash);

        const fetchFarmerInfo = async () => {
            if(contract && hash) {
                try {
                    const accounts = await web3.eth.getAccounts();
                    const result = await contract.methods.getFarmerInfo(hash).call({from: accounts[0]});

                    setFarmerInfo({
                        name: result.name,
                        fatherName: result.fatherName,
                        gender: result.gender,
                        dob: format(new Date(Number(result.dob)), 'dd/MM/yyyy'),
                        mobileNumber: result.mobileNumber,
                        aadharNumber: result.aadharNumber,
                        resaddress: result.resaddress,
                        district: result.district,
                        state: result.state,
                        signHash: result.signHash,
                        farmerAddress: result.farmerAddress,
                    });
                } catch(error) {
                    console.error('Error fetching farmer information:', error);
                }
            }
        };

        fetchFarmerInfo();
    }, [contract, hash, location]);

    return (
        <div>
            <h2>Farmer Information</h2>
            {farmerInfo ? (
                <div>
                    <p>Name: {farmerInfo.name}</p>
                    <p>Father's Name: {farmerInfo.fatherName}</p>
                    <p>Gender: {farmerInfo.gender}</p>
                    <p>Date of Birth: {farmerInfo.dob}</p>
                    <p>Mobile Number: {farmerInfo.mobileNumber}</p>
                    <p>Aadhar Number: {farmerInfo.aadharNumber}</p>
                    <p>Residential Address: {farmerInfo.resaddress}</p>
                    <p>District: {farmerInfo.district}</p>
                    <p>State: {farmerInfo.state}</p>
                    <p>Farmer Address: {farmerInfo.farmerAddress}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FarmerInfo;;
