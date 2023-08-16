import {SHA256} from 'crypto-js';

const Authenticate = (userid, password) => {
    let hash = SHA256(
        userid + password
    ).toString();

    return hash;
};

export default Authenticate;