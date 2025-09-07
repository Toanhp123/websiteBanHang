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

// [GET] /warehouse/export
router.get(
	"/export",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getExportBasicInfo)
);

// [GET] /warehouse/inventoryAudit
router.get(
	"/inventoryAudit",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getInventoryAuditBasicInfo)
);

// [GET] /warehouse/export/:export_id
router.get(
	"/export/:export_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getExportDetail)
);

module.exports = router;
