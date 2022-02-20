function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function totalAmtToBePaid(investment){
    return investment;
}

function getReturnAmount(stake, stakeRatio){
    return stake*stakeRatio;
}

module.exports = {
    randomNumber, 
    totalAmtToBePaid, 
    getReturnAmount
};