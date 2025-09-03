const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

// [GET] /dashboard/overview
router.get(
	"/overview",
	checkAccessToken,
	checkRole(["Admin"]),
	dashboardController.getOverview
);

router.get(
	"/saleStatistics",
	checkAccessToken,
	checkRole(["Admin"]),
	dashboardController.getSaleStatistics
);

module.exports = router;
