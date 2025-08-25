const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const productController = require("../controllers/product.controller");

const route = express.Router();

route.get("/categories", catchAsync(productController.getCategories));

route.get("/type", catchAsync(productController.getProductType));

route.get("/status", catchAsync(productController.getProductStatus));

route.get("/stock/:productID", catchAsync(productController.getProductStock));

route.get("/", catchAsync(productController.getProductByCondition));

module.exports = route;
