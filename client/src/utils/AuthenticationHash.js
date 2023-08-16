import {SHA256} from 'crypto-js';

const AuthenticationHash = async (userid, accountAddress, password) => {
    let hash = SHA256(
        userid + accountAddress + password
    ).toString();

    return hash;
};

export default AuthenticationHash;