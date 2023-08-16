import AuthenticationHash from './AuthenticationHash';

const AuthValidation = async (auth, userid, accountAddress, password, contract) => {
    try {
        let userAddress = await contract.methods.getUserAddress(auth).call();

        //console.log(`${auth}\n${userid}\n${accountAddress}\n${password}`);
        console.log('User address:', userAddress);

        if(userAddress.toLowerCase() !== accountAddress.toLowerCase()) {
            return false;
        } else {
            let hash = String(await AuthenticationHash(userid, accountAddress, password));
            console.log(hash);

            // get hash from the contract
            let hashFromContract = await contract.methods.getSignatureHash(auth);
            //console.log(`${hash}\n${hashFromContract}`);

            if(hash === hashFromContract) {
                return true;
            } else {
                return false;
            }
        }
    } catch(error) {
        console.error('Error during authentication:', error);
        return false;
    }
};

export default AuthValidation;
