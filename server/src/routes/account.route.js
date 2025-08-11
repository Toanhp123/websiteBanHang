const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const accountController = require("../controllers/account.controller");

const router = express.Router();

// [GET] /account/:username
router.get(
	"/:username",
	checkAccessToken,
	catchAsync(accountController.getAccountByUsername)
);

// [GET] /account
router.get(
	"/",
	checkAccessToken,
	catchAsync(accountController.getAccountByCondition)
);

module.exports = router;
