const { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL, sendAndConfirmTransaction } = require("@solana/web3.js");

const getWalletBalance = async(key) => {
    try { 
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(new PublicKey(key));
        return walletBalance / LAMPORTS_PER_SOL;
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

const airDropSol = async(newPair, tamt) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log("aa raha");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(newPair.publicKey.toString()),
            tamt * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
    getWalletBalance, 
    transferSol, 
    airDropSol
};