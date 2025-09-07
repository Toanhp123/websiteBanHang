const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const warehouseController = require("../controllers/warehouse.controller");

const router = express.Router();

// [GET] /warehouse/receipt
router.get(
	"/receipt",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getReceiptBasicInfo)
);

// [GET] /warehouse/receipt/:receipt_id
router.get(
	"/receipt/:receipt_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getReceiptDetail)
);

module.exports = router;
