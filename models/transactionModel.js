const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
    AppliedFeeID: {
        type: String,
        unique: true
    },
    AppliedFeeValue: {
        type: Number,
        min: [0, "please provide a valid number"],
    },
    ChargeAmount: {
        type: Number,
        min: [0, "please provide a valid SixID"],
    },
    SettlementAmount: {
        type: Number,
        min: [1, "please provide a valid SixID"],
    }
});

module.exports = model("Transaction", TransactionSchema);