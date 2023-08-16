import React, {useState} from 'react';
import {Card, Form, Button} from 'semantic-ui-react';
import Authenticate from '../utils/Authenticate';
import AuthValidation from '../utils/AuthValidation';
import Web3 from 'web3';
import {Link, useHistory} from 'react-router-dom';
import contractBuild from '../contracts/Farmer.json';

const contractABI = contractBuild.abi;
const contractAddress = contractBuild.networks['5777'].address;

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

const FarmSignIn = () => {
    const [mobilenumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onSignIn = async () => {
        try {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const auth = String(Authenticate(mobilenumber, password));
            const accounts = await web3.eth.getAccounts();
            const accountAddress = accounts[0];

            const isValid = AuthValidation(auth, mobilenumber, accountAddress, password, contract);
            console.log(isValid);

            if(isValid) {
                console.log(auth);
                history.push(`/farmer-info?hash=${auth}`);
                console.log('Authentication successful!');
            } else {
                console.log(auth);
                console.log('Authentication failed!');
            }
        } catch(error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <div className="sign-in">
            <div className="signin-form">
                <div className="centered-container">
                    <div className="spacer"></div>
                    <Card fluid className="farmin-card-size">
                        <Card.Content>
                            <Form size="large">
                                <Form.Field>
                                    <label htmlFor="mobile-number">Mobile Number</label>
                                    <input
                                        type="text"
                                        id="mobile-number"
                                        value={mobilenumber}
                                        onChange={handleMobileNumberChange}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Form.Field>
                                <Button type="submit" primary fluid size="large" onClick={onSignIn}>
                                    Sign In
                                </Button>
                            </Form>
                        </Card.Content>
                    </Card>
                    <div className="signup-link">
                        Don't have an account? <Link to="/farmer-signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmSignIn;
