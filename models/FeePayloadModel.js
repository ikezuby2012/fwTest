const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model } = mongoose;

const feePayloadSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    amount: {
        type: Number,
        min: [0, "amount must be non-negative"]
    },
    currency: {
        type: String,
        uppercase: true,
        default: "NGN"
    },
    currency_country: {
        type: String,
        uppercase: true,
        default: "NG"
    },
    customer: {
        id: {
            type: String,
            unique: true
        },
        email_address: {
            type: String,
            unique: true,
            validate: [validator.isEmail, "please provide a valid email address"]
        },
        FullName: {
            type: String,
            minLength: [1, "please provide a valid name"]
        },
        BearsFee: {
            type: Boolean,
            default: true
        }
    },
    PaymentEntity: {
        id: {
            type: String,
            unique: true
        },
        Issuer: {
            type: String,
        },
        Brand: {
            type: String,
            enum: ["MASTERCARD", "VISA", "AMEX", "VERVE", "*"],
            default: "*"
        },
        Number: {
            type: String,
            minLength: [5, "please provide a valid number"]
        },
        SixID: {
            type: Number,
            min: [5, "please provide a valid SixID"],
            minLength: [5, "please provide a valid number"]
        },
        Type: {
            type: String,
            enum: ["CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"]
        },
        Country: {
            type: String,
            default: "NG"
        }
    }
});

const FeePayload = model("Fee", feePayloadSchema);
module.exports = FeePayload;