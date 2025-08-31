const { checkAccessToken } = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const promotionController = require("../controllers/promotion.controller");

const router = express.Router();

// [GET] /promotion/validate/:username
router.get(
	"/:promotion_id",
	checkAccessToken,
	catchAsync(promotionController.getDetailPromotion)
);

// [POST] /promotion/check
router.post(
	"/check",
	checkAccessToken,
	catchAsync(promotionController.checkPromotionCanApply)
);

module.exports = router;
