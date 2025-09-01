const {
	checkAccessToken,
	checkRefreshToken,
} = require("../middlewares/auth.middleware");
const {
	validateUserLogin,
	validateUserRegister,
} = require("../middlewares/auth.middleware");

const express = require("express");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// [POST] /auth/loginCustomer
router.post(
	"/loginCustomer",
	validateUserLogin,
	catchAsync(authController.loginCustomer)
);

// [POST] /auth/logout
router.post(
	"/logout",
	checkAccessToken,
	checkRefreshToken,
	catchAsync(authController.logout)
);

// [POST] /auth/register
router.post(
	"/registerCustomer",
	validateUserRegister,
	catchAsync(authController.registerCustomer)
);

// [POST] /auth/refresh-token
router.post(
	"/refresh-token",
	checkRefreshToken,
	catchAsync(authController.getNewAccessToken)
);

// [POST] /auth/forgotPass/getOTP
router.post(
	"/forgotPass/getOTP",
	catchAsync(authController.checkEmailToGetOTP)
);

// [POST] /auth/forgotPass/checkOTP
router.post("/forgotPass/checkOTP", catchAsync(authController.verifyOtp));

// [POST] /auth/fake-cookies
router.post("/fake-cookies", (req, res) => {
	const fakeUser = {
		id: 1,
		username: "fakeUser",
		role: "admin",
	};

	const fakeAccessToken = jwt.sign(fakeUser, "wrong_secret", {
		expiresIn: "1h",
	});
	const fakeRefreshToken = jwt.sign(fakeUser, "wrong_secret", {
		expiresIn: "30d",
	});

	res.cookie("ACCESS_TOKEN", fakeAccessToken, {
		httpOnly: false,
		secure: false,
		maxAge: 60 * 60 * 1000, // 1 hour
	});

	res.cookie("REFRESH_TOKEN", fakeRefreshToken, {
		httpOnly: true,
		secure: false,
		maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
	});

	res.status(200).json({ message: "Fake cookies created" });
});

module.exports = router;
