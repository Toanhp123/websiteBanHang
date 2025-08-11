const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const profileController = require("../controllers/profile.controller");

const router = express.Router();

// [POST] /profile/:username
router.get("/:id", checkAccessToken, catchAsync(profileController.getProfile));

module.exports = router;
