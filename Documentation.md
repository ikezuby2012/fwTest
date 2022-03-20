POST CONFIGURATION FEE SPECS
POST https://zuby-fwtest.herokuapp.com/api/v1/fee

response 
 {
    "status": "ok"
}

GET ALL CONFIGURATION FEE SPECS
GET https://zuby-fwtest.herokuapp.com/api/v1/fee

response 
{
    "status": "ok",
    "data": [
        {
            "_id": "623232f57c07369e3a7b3053",
            "fee_id": "LNPY1221",
            "FCS": "LNPY1221 NGN * *(*) : APPLY PERC 1.4",
            "fee_currency": "NGN",
            "fee_locale": "*",
            "fee_entity": "*(*)",
            "fee_type": "PERC",
            "fee_value": "1.4",
            "__v": 0
        },
        {
            "_id": "623232f57c07369e3a7b3057",
            "fee_id": "LNPY1225",
            "FCS": "LNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55",
            "fee_currency": "NGN",
            "fee_locale": "*",
            "fee_entity": "USSD(MTN)",
            "fee_type": "PERC",
            "fee_value": "0.55",
            "__v": 0
        },
        {
            "_id": "623232f57c07369e3a7b3054",
            "fee_id": "LNPY1222",
            "FCS": "LNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0",
            "fee_currency": "NGN",
            "fee_locale": "INTL",
            "fee_entity": "CREDIT-CARD(VISA)",
            "fee_type": "PERC",
            "fee_value": "5.0",
            "__v": 0
        },
        {
            "_id": "623232f57c07369e3a7b3055",
            "fee_id": "LNPY1223",
            "FCS": "LNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4",
            "fee_currency": "NGN",
            "fee_locale": "LOCL",
            "fee_entity": "CREDIT-CARD(*)",
            "fee_type": "FLAT_PERC",
            "fee_value": "50:1.4",
            "__v": 0
        },
        {
            "_id": "623232f57c07369e3a7b3056",
            "fee_id": "LNPY1224",
            "FCS": "LNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100",
            "fee_currency": "NGN",
            "fee_locale": "*",
            "fee_entity": "BANK-ACCOUNT(*)",
            "fee_type": "FLAT",
            "fee_value": "100",
            "__v": 0
        }
    ]
}

COMPUTE TRANSACTION FEE
POST https://zuby-fwtest.herokuapp.com/api/v1/fee/compute-transaction-fee

response 
 {
    "status": "ok",
    "data": {
        "AppliedFeeID": "91203",
        "AppliedFeeValue": 120,
        "ChargeAmount": 5120,
        "SettlementAmount": 5000,
        "_id": "62362b8b5ca400e6fd5f1d43",
        "__v": 0
    }
}