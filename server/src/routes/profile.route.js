const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const profileController = require("../controllers/profile.controller");

const router = express.Router();

// [GET] /profile
router.get("/", checkAccessToken, catchAsync(profileController.getProfile));

// [PATCH] /profile/update
router.patch(
	"/update",
	checkAccessToken,
	checkRole(["Customer"]),
	catchAsync(profileController.updateProfile)
);

module.exports = router;
