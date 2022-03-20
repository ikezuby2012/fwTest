const Fee = require("../models/feeModel");
const Transaction = require("../models/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllConfigurationFeeSpecs = catchAsync(async (req, res, next) => {
    const fees = await Fee.find({});

    res.status(200).json({
        status: "ok",
        data: fees
    })
})

exports.postConfigurationFeeSpecs = catchAsync(async (req, res, next) => {
    const acceptedEntity = ["*", "CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"];
    let input, data, _data;
    let dataArr = [];
    input = req.body.feeConfigurationSpecs.toString().split("\n");
    // console.log(input);
    input.map((el, i) => {
        _data = el.split(" ");
        // acceptedEntity.map(el => {
        //     if (!(_data[3].startsWith(el)))
        //         return next(new AppError("use only allowed entity e.g *, CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID", 403));
        // })
        data = {
            FCS: el,
            fee_id: _data[0],
            fee_currency: _data[1],
            fee_locale: _data[2],
            fee_entity: _data[3],
            fee_type: _data[6],
            fee_value: _data[7]
        }
        dataArr.push(data);
    });
    // console.log(dataArr);
    await Fee.create(dataArr);

    res.status(201).json({
        status: "ok"
    });
});

exports.configureFees = catchAsync(async (req, res, next) => {
    const { id, amount, currency, currency_country, PaymentEntity, customer } = req.body;
    const { Country, Type, Brand } = PaymentEntity;
    const { BearsFee } = customer;
    let feeType, AppliedFeeValue, AppliedFeeID, ChargeAmount, SettlementAmount, feeValue;
    let feeLocale = "INTL";
    let feeEntity = "*(*)";
    feeEntity = `${Type}(${Brand})`;

    if (currency_country === Country) feeLocale = "LOCL";

    console.log(feeLocale, feeEntity);

    const matchConfig = await Fee.aggregate([
        {
            $match: {
                fee_currency: currency,
                fee_locale: {
                    $in: ["*", feeLocale]
                },
                fee_entity: {
                    $in: ["*(*)", `${Type}(*)`, feeEntity]
                }
            }
        }
    ]);
    // console.log(matchConfig);
    const results = matchConfig.sort((a, b) => a.precedence - b.precedence);

    if (matchConfig.length === 0) {
        return next(new AppError("no configuration found for the set", 404));
    }

    // for (let props of matchConfig) {
    //     feeType = props.fee_type;
    //     feeValue = props.fee_value;
    //     // console.log(feeType);
    // }
    feeType = results[0].fee_type;
    feeValue = results[0].fee_value;

    if (feeType === "FLAT_PERC") {
        const fee_value = feeValue.split(":")[0] * 1;
        const fee_ratio = feeValue.split(":")[1] * 1;

        AppliedFeeValue = Math.round(fee_value + ((fee_ratio / 100) * amount));
    }

    if (feeType === "FLAT") AppliedFeeValue = feeValue * 1;
    if (feeType === "PERC") AppliedFeeValue = (feeValue * 1 * amount) / 100;

    if (BearsFee) {
        ChargeAmount = amount + AppliedFeeValue;
    } else {
        ChargeAmount = amount
    }

    SettlementAmount = ChargeAmount - AppliedFeeValue;
    AppliedFeeID = id.toString();


    let newTransaction = await Transaction.create({
        AppliedFeeID,
        AppliedFeeValue,
        ChargeAmount,
        SettlementAmount
    });

    res.status(200).json({
        status: "ok",
        data: newTransaction
    });
});