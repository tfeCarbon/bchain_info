const SignData = async (username, accountAddress, web3) => {
    try {
        const signature = await web3.eth.personal.sign(username, accountAddress);
        const signedData = web3.eth.accounts.hashMessage(signature);

        return signedData;
    } catch(err) {
        return err;
    }
};

export default SignData;