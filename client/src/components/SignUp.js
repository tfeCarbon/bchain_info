import React from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
    return (
        <div>
            <h2>Sign Up</h2>
            <form>
                <label htmlFor="person-type">Person Type: </label>
                {/*<select id="person-type">
                    <option value="">Select Person Type</option>
                    <option value="farmer">Farmer</option>
                    <option value="insurance-company">Insurance Company</option>
                </select>*/}
                <br />
                {/* Use Link component to handle navigation */}
                <Link to="/farmer-signup">
                    <button>Farmer</button>
                </Link>
                <Link to="/company-signup">
                    <button>Insurance Company</button>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;
