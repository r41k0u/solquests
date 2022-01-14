const { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL, sendAndConfirmTransaction } = require("@solana/web3.js");
const dotenv = require("dotenv");

const userPublicKey = process.env.PUBLIC_KEY;
const userSecretKey = process.env.SECRET_KEY;
const userWallet = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));

const getWalletBalance = async(key) => {
    try { 
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(new PublicKey(key));
        console.log(`=> For wallet address ${key}`);
        console.log(`Wallet balance: ${parseInt(walletBalance)} LAMPORTS`);
    } catch(err) {
        console.log(err);
    }
};

const transferSol = async(from, to, amt) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(from.publicKey.toString()),
                toPubkey: new PublicKey(to.publicKey.toString()),
                lamports: amt * LAMPORTS_PER_SOL
            })
        )
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    } catch(err) {
        console.log(err);
    }
}