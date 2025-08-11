const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const productController = require("../controllers/product.controller");

const route = express.Router();

route.get("/categories", catchAsync(productController.getCategories));

route.get("/", catchAsync(productController.getAllProduct));

module.exports = route;
