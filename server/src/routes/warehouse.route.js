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

// [GET] /warehouse/inventory/:warehouse_id?supplier_id=:supplier_id
router.get(
	"/inventory/:warehouse_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getInventory)
);

// [GET] /warehouse/export/:export_id
router.get(
	"/export/:export_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getExportDetail)
);

// [GET] /warehouse/:warehouse_id
router.get(
	"/:warehouse_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getWarehouseByID)
);

// [GET] /warehouse/
router.get(
	"/",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.getAllWarehouse)
);

// [POST] /warehouse/import
router.post(
	"/import",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.createWarehouseImport)
);

// [PUT] /warehouse/:warehouse_id
router.put(
	"/:warehouse_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.updateWarehouse)
);

// [DELETE] /warehouse/:warehouse_id
router.delete(
	"/:warehouse_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.deleteWarehouse)
);

// [POST] /warehouse/addWarehouse
router.post(
	"/addWarehouse",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(warehouseController.addWarehouse)
);

module.exports = router;
