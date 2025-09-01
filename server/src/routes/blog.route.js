const {
	checkAccessToken,
	checkRefreshToken,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

// [GET] /blog
router.get("/", catchAsync(blogController.getAllBlog));

// [GET] /blog/category
router.get("/category", catchAsync(blogController.getBlogCategory));

module.exports = router;
