const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const billController = require("../controllers/bill.controller");

const router = express.Router();

// [POST] /bill
router.post("/", checkAccessToken, catchAsync(billController.createBill));

module.exports = router;
