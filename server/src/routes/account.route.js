const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const accountController = require("../controllers/account.controller");

const router = express.Router();

// [POST] /account/cart
router.post(
	"/cart",
	checkAccessToken,
	catchAsync(accountController.putItemToCart)
);

// [GET] /account/cart
router.get("/cart", checkAccessToken, catchAsync(accountController.getCart));

// [GET] /account
router.get(
	"/",
	checkAccessToken,
	catchAsync(accountController.getAccountByCondition)
);

// [DELETE] /account/cart/:id
router.delete(
	"/cart/:id",
	checkAccessToken,
	catchAsync(accountController.deleteItemInCart)
);

// [GET] /account/:username
router.get(
	"/:username",
	checkAccessToken,
	catchAsync(accountController.getAccountByUsername)
);

module.exports = router;
