const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const feeSchema = new Schema({
    fee_id: {
        type: String
    },
    FCS: { type: String, },
    fee_currency: {
        type: String,
        default: "NGN"
    },
    fee_locale: {
        type: String,
        enum: ["*", "LOCL", "INTL"],
        default: "LOCL"
    },
    fee_entity: {
        type: String,
        // enum: ["*", "CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"],
        default: "*"

    },
    fee_type: {
        type: String,
        enum: ["FLAT", "PERC", "FLAT_PERC"]
    },
    fee_value: {
        type: String,
        // min: [0, "this is a non-negative value"]
    }
});

const Fee = model("Fee", feeSchema);
module.exports = Fee;