const { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey

const getWalletBalance = async() => {
    try { 
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = newPair;
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet balance: ${parseInt(walletBalance)} LAMPORTS`);
    } catch(err) {
        console.log(err);
    }
};

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = newPair;
        console.log("aa raha");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch(err) {
        console.log(err);
    }
};

const driver = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driver();