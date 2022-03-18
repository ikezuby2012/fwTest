const express = require("express");
const {
    postConfigurationFeeSpecs, getAllConfigurationFeeSpecs, configureFees
} = require("../controllers/feeController");

const router = express.Router();

router.route("/").post(postConfigurationFeeSpecs).get(getAllConfigurationFeeSpecs);
router.post("/compute-transaction-fee", configureFees);

module.exports = router;