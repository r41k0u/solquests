const {getWalletBalance,transferSol,airDropSol}=require("./solana");
const {getReturnAmount,totalAmtToBePaid,randomNumber}=require("./helper");
const web3 = require("@solana/web3.js");
const dotenv = require("dotenv");

const userSecretKey = process.env.USER_SECRET;
const userWallet = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));

const gameSecretKey = Process.env.GAME_SECRET;
const gameWallet = Keypair.fromSecretKey(Uint8Array.from(gameSecretKey));

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
console.log(connection);

const init = () => {
    console.log("SOL Stake game");
    console.log("max bid : 2.5 SOL");
}

const askQuestions = () => {
    const questions = [
        {
            name: "SOL",
            type: "number",
            message: "What is the amount of SOL you want to stake?",
        },
        {
            name: "RATIO",
            type: "rawlist",
            message: "What is the ratio of your staking?",
            choices: ["1:1.25", "1:1.5", "1.75", "1:2"],
            filter: function (val) {
                const stakeFactor = val.split(":")[1];
                return stakeFactor;
            },
        },
        {
            name: "RANDOM",
            type: "number",
            message: "Guess a random number from 1 to 5 (both 1, 5 included)",
            when: async (val) => {
                if (parseFloat(totalAmtToBePaid(val.SOL)) > 5) {
                    console.log("You have violated the max stake limit. Stake with smaller amount.")
                    return false;
                } else {
                    console.log(`You need to pay ${totalAmtToBePaid(val.SOL)} to move forward`)
                    const userBalance = await getWalletBalance(userWallet.publicKey.toString())
                    if (userBalance < totalAmtToBePaid(val.SOL)) {
                        console.log(`You don't have enough balance in your wallet`);
                        return false;
                    } else {
                        console.log(`You will get ${getReturnAmount(val.SOL, parseFloat(val.RATIO))} if guessing the number correctly`)
                        return true;
                    }
                }
            },
        },
    ];
    return inquirer.prompt(questions);
}

const gameExecution = () => {
    init();
    const generateRandomNumber = randomNumber(1, 5);
    const answers = await askQuestions();
    if (answers.RANDOM) {
        const paymentSignature = await transferSol(userWallet, gameWallet, totalAmtToBePaid(answers.SOL))
        console.log(`Signature of payment for playing the game: ${paymentSignature}`);

        if (answers.RANDOM === generateRandomNumber) {
            await airDropSol(treasuryWallet, getReturnAmount(answers.SOL, parseFloat(answers.RATIO)));
            const prizeSignature = await transferSol(gameWallet, userWallet, getReturnAmount(answers.SOL, parseFloat(answers.RATIO)));
            console.log(`Your guess is absolutely correct`);
            console.log(`Here is the price signature: ${prizeSignature}`);
        } else {
            console.log(`Better luck next time`);
        }
    }
}

gameExecution();