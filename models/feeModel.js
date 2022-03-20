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
        default: "*"
    },
    fee_entity: {
        type: String,
        // enum: ["*", "CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"],
        default: "*"

    },
    fee_type: {
        type: String,
        enum: ["FLAT", "PERC", "FLAT_PERC"],
        default: "FLAT"
    },
    fee_value: {
        type: String,
        // min: [0, "this is a non-negative value"]
    },
    precedence: { type: Number }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

feeSchema.pre("save", async function (next) {
    const { FCS } = this;
    const str1 = FCS.replace(/[^*]/g, "").length;
    console.log(str1);
    this.precedence = str1;
    next();
});

const Fee = model("Fee", feeSchema);
module.exports = Fee;