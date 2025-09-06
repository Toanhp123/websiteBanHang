const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const productController = require("../controllers/product.controller");
const { upload } = require("../middlewares/upload.middleware");

const route = express.Router();

route.get("/categories", catchAsync(productController.getCategories));

route.get(
	"/warehouse",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(productController.getWarehouse)
);

route.get(
	"/supplier",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(productController.getSupplier)
);

route.get(
	"/advancedInfo",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(productController.getProductAdvancedInfo)
);

route.post(
	"/addProduct",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	upload.fields([
		{ name: "mainImage", maxCount: 1 },
		{ name: "subImages", maxCount: 4 },
	]),
	catchAsync(productController.addProduct)
);

route.put(
	"/updateProduct",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	upload.fields([
		{ name: "mainImage", maxCount: 1 },
		{ name: "subImages", maxCount: 4 },
	]),
	catchAsync(productController.updateProduct)
);

route.delete(
	"/:product_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(productController.deleteProduct)
);

route.get("/type", catchAsync(productController.getProductType));

route.get("/status", catchAsync(productController.getProductStatus));

route.get("/stock/:productID", catchAsync(productController.getProductStock));

route.get("/:product_id", catchAsync(productController.getProductByID));

route.get("/", catchAsync(productController.getProductByCondition));

module.exports = route;
