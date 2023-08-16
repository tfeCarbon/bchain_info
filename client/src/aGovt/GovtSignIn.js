import React, {useState} from 'react';
import {Card, Form, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const GovtSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform sign-in logic here with email and password
        console.log('Signing in...');
    };

    return (
        <div className="sign-in">
            <div className="signin-form">
                <div className="centered-container">
                    <div className="spacer"></div>
                    <Card fluid className="farmin-card-size">
                        <Card.Content>
                            <Form size="large" onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
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

                                <Button type="submit" primary fluid size="large">
                                    Sign In
                                </Button>
                            </Form>
                        </Card.Content>
                    </Card>
                    <div className="signup-link">
                        Don't have an account? <Link to="/sign-up">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovtSignIn;
