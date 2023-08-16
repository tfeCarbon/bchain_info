import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Card, Message, Grid} from 'semantic-ui-react';
import '../App.css';

class GovtSignUp extends Component {
    state = {
        email: '',
        govtID: '',
        state: '',
        district: '',
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
            this.setState({passwordError: 'Password must be at least 8 characters long'});
        } else if(password !== confirmPassword) {
            this.setState({passwordError: 'Passwords do not match'});
        } else {
            this.setState({passwordError: ''});
        }
    };

    render() {
        return (
            <div className="sign-up">
                <div className='signup-form'>
                    <div className="centered-container">
                        <div className="spacer"></div>
                        <Card fluid className="gcustom-card-size">
                            <Card.Content>
                                <Form size='large'>
                                    <Grid columns={2} stackable>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Government ID</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your government ID'
                                                        value={this.state.govtID}
                                                        onChange={(e) => this.setState({govtID: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>Email</label>
                                                    <input
                                                        required
                                                        type='email'
                                                        placeholder="Enter your email"
                                                        value={this.state.email}
                                                        onChange={(e) => this.setState({email: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>State</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your state'
                                                        value={this.state.state}
                                                        onChange={(e) => this.setState({state: e.target.value})}
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Field>
                                                    <label>District</label>
                                                    <input
                                                        required
                                                        type='text'
                                                        placeholder='Enter your district'
                                                        value={this.state.district}
                                                        onChange={(e) => this.setState({district: e.target.value})}
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
                                                        onChange={(e) =>
                                                            this.setState({password: e.target.value}, this.validatePasswords)
                                                        }
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
                                                        onChange={(e) =>
                                                            this.setState({confirmPassword: e.target.value}, this.validatePasswords)
                                                        }
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
                                    <div className="spacer"></div>
                                    <Button type='submit' primary fluid size='large' onClick={this.onSignUp}>
                                        Create account
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                        <div className="gsignin-onUp">
                            Already have an account? <Link to='/sign-in'>Sign in</Link>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default GovtSignUp;
