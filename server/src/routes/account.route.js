const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const accountController = require("../controllers/account.controller");

const router = express.Router();

// [PATCH] /account/cart/:id_product
router.patch(
	"/cart/:id_product",
	checkAccessToken,
	catchAsync(accountController.changeQuantityItemCart)
);

// [PUT] /account/cart
router.put(
	"/cart",
	checkAccessToken,
	catchAsync(accountController.putItemToCart)
);

// [PUT] /account/password
router.put(
	"/password",
	checkAccessToken,
	catchAsync(accountController.changePassword)
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

// [DELETE] /account/cart/:id
router.delete(
	"/cart",
	checkAccessToken,
	catchAsync(accountController.deleteCart)
);

// [GET] /account/:username
router.get(
	"/:username",
	checkAccessToken,
	catchAsync(accountController.getAccountByUsername)
);

module.exports = router;
