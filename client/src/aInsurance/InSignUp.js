import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card, Message, Grid} from 'semantic-ui-react';
import "../App.css";

class InSignUp extends Component {
    state = {
        companyName: '',
        email: '',
        interestRate: '',
        policyNumber: '',
        password: '',
        confirmPassword: '',
        passwordError: ''
    };

    onSignUp = async () => {
        // Handle sign-up logic here
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
                        <Card fluid className="incustom-card-size">
                            <Card.Content>
                                <Form size='large'>
                                    <Grid columns={2} stackable>
                                        <Grid.Column>
                                            <Form.Field>
                                                <label>Company Name</label>
                                                <input
                                                    required
                                                    type='text'
                                                    placeholder='Enter your company name'
                                                    value={this.state.companyName}
                                                    onChange={(e) => this.setState({companyName: e.target.value})}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form.Field>
                                                <label>Email</label>
                                                <input
                                                    required
                                                    type='email'
                                                    placeholder='Enter your email'
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({email: e.target.value})}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form.Field>
                                                <label>Interest Rate (%)</label>
                                                <input
                                                    required
                                                    type='number'
                                                    step='0.01'
                                                    placeholder='Enter the interest rate'
                                                    value={this.state.interestRate}
                                                    onChange={(e) => this.setState({interestRate: e.target.value})}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Form.Field>
                                                <label>Policy Number</label>
                                                <input
                                                    required
                                                    type='text'
                                                    placeholder='Enter the policy number'
                                                    value={this.state.policyNumber}
                                                    onChange={(e) => this.setState({policyNumber: e.target.value})}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
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
                                    </Grid>
                                    {this.state.passwordError && (
                                        <Message negative size='tiny'>
                                            {this.state.passwordError}
                                        </Message>
                                    )}
                                    <div class="spacer"></div>
                                    <Button type='submit' primary fluid size='large' onClick={this.onSignUp}>
                                        Create account
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                        <div className="insignin-onUp">
                            Already have an account? <Link to='/sign-in'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InSignUp;
