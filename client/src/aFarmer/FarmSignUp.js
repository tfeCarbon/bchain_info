import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card, Message, Grid} from 'semantic-ui-react';
import Web3 from 'web3';
import contractBuild from '../contracts/Farmer.json';
import AuthenticationHash from '../utils/AuthenticationHash';
import Authenticate from '../utils/Authenticate';
import "../App.css";


//const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const web3 = new Web3(window.ethereum);
await window.ethereum.enable();
if(window.ethereum) {
    try {
        await window.ethereum.enable();
    } catch(error) {
        console.error('User denied account access');
    }
} else {
    console.error('MetaMask not detected');
}

const contractABI = contractBuild.abi;
const contractAddress = contractBuild.networks['5777'].address;

class FarmSignUp extends Component {
    state = {
        name: '',
        fatherName: '',
        gender: '',
        dob: '',
        mobilenumber: '',
        aadharNumber: '',
        address: '',
        district: '',
        state: '',
        password: '',
        confirmPassword: '',
        passwordError: ''
    };

    onSignUp = async () => {
        const {
            name,
            fatherName,
            gender,
            dob,
            mobilenumber,
            aadharNumber,
            address,
            district,
            state,
            password
        } = this.state;

        try {
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const accounts = await web3.eth.getAccounts();
            const farmerAddress = accounts[0];

            const signHash = String(await AuthenticationHash(mobilenumber, farmerAddress, password));
            const auth = String(await Authenticate(mobilenumber, password));
            console.log(`${signHash}\n${auth}`);

            const register = contract.methods.registerFarmer(
                name,
                fatherName,
                gender,
                new Date(dob).getTime(),
                mobilenumber,
                aadharNumber,
                address,
                district,
                state,
                signHash,
                auth
            );

            const gas = await register.estimateGas();

            const gasPrice = await web3.eth.getGasPrice();
            const gasFee = gas * gasPrice;
            console.log(`${gas}, ${gasPrice}, ${gasFee}`);

            await contract.methods.registerFarmer(
                name,
                fatherName,
                gender,
                new Date(dob).getTime(),
                mobilenumber,
                aadharNumber,
                address,
                district,
                state,
                signHash,
                auth
            ).send({
                from: farmerAddress,
                value: gasFee
            });


            console.log('Registration successful!');
        } catch(error) {
            console.error('Registration failed', error);
        }
    };


    validatePasswords = () => {
        const {password, confirmPassword} = this.state;
        if(password.length < 8) {
            this.setState({passwordError: "at least 8 characters for password"});
        } else if(password !== confirmPassword) {
            this.setState({passwordError: "Passwords do not match"});
        } else {
            this.setState({passwordError: ""});
        }
    };

    render() {
        return (
            <div className="sign-up">
                <div className='signup-form'>
                    <div className="centered-container">
                        <div class="spacer"></div>
                        <Card fluid className="custom-card-size">
                            <Card.Content>
                                <Form size='large'>
                                    <Grid columns={2} stackable>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Name</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your name'
                                                        value={this.state.name}
                                                        onChange={e => this.setState({name: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Father's Name</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder="Enter your father's name"
                                                        value={this.state.fatherName}
                                                        onChange={e => this.setState({fatherName: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Gender</label>
                                                    <select
                                                        required
                                                        value={this.state.gender}
                                                        onChange={e => this.setState({gender: e.target.value})}
                                                    >
                                                        <option value=''>Select gender</option>
                                                        <option value='male'>Male</option>
                                                        <option value='female'>Female</option>
                                                        <option value='other'>Other</option>
                                                    </select>
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Date of Birth</label>
                                                    <input
                                                        required
                                                        type='date'
                                                        value={this.state.dob}
                                                        onChange={e => this.setState({dob: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Mobile Number</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your mobile number'
                                                        value={this.state.mobilenumber}
                                                        onChange={e => this.setState({mobilenumber: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Aadhar Number</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your Aadhar number'
                                                        value={this.state.aadharNumber}
                                                        onChange={e => this.setState({aadharNumber: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Form.Field>
                                                    <label>Address</label>
                                                    <textarea
                                                        required
                                                        placeholder='Enter your address'
                                                        style={{width: '100%'}}
                                                        value={this.state.address}
                                                        onChange={e => this.setState({address: e.target.value})}
                                                    ></textarea>
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>District</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your district'
                                                        value={this.state.district}
                                                        onChange={e => this.setState({district: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>State</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your state'
                                                        value={this.state.state}
                                                        onChange={e => this.setState({state: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Password</label>
                                                    <input
                                                        required
                                                        type='password'
                                                        placeholder='Enter your password'
                                                        value={this.state.password}
                                                        onChange={(e) => {
                                                            this.setState({password: e.target.value}, this.validatePasswords);
                                                        }}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Confirm Password</label>
                                                    <input
                                                        required
                                                        type='password'
                                                        placeholder='Confirm your password'
                                                        value={this.state.confirmPassword}
                                                        onChange={(e) => {
                                                            this.setState({confirmPassword: e.target.value}, this.validatePasswords);
                                                        }}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            {this.state.passwordError && (
                                                <Grid.Column>
                                                    <Message negative size='tiny'>
                                                        {this.state.passwordError}
                                                    </Message>
                                                </Grid.Column>
                                            )}
                                        </Grid.Row>
                                    </Grid>
                                    <div class="spacer"></div>
                                    <Button type='submit' primary fluid size='large' onClick={this.onSignUp}>
                                        Create account
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                        <div className="signin-onUp">
                            Already have an account? <Link to='/sign-in'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FarmSignUp;