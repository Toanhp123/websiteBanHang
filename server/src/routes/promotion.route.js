const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const promotionController = require("../controllers/promotion.controller");

const router = express.Router();

// [GET] /promotion/rule/type
router.get(
	"/rule/type",
	checkAccessToken,
	catchAsync(promotionController.getAllPromotionRuleType)
);

// [GET] /promotion/effect/type
router.get(
	"/effect/type",
	checkAccessToken,
	catchAsync(promotionController.getAllPromotionEffectType)
);

// [GET] /promotion/thisCustomer
router.get(
	"/thisCustomer",
	checkAccessToken,
	catchAsync(promotionController.getAllPromotionThisCustomer)
);

// [GET] /promotion/product
router.get(
	"/product",
	checkAccessToken,
	catchAsync(promotionController.getDiscountForProduct)
);

// [GET] /promotion/:promotion_id
router.get(
	"/:promotion_id",
	checkAccessToken,
	catchAsync(promotionController.getDetailPromotion)
);

// [GET] /promotion
router.get(
	"/",
	checkAccessToken,
	catchAsync(promotionController.getAllPromotion)
);

// [POST] /promotion/create
router.post(
	"/create",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(promotionController.createPromotion)
);

// [POST] /promotion/check
router.post(
	"/check",
	checkAccessToken,
	catchAsync(promotionController.checkPromotionCanApply)
);

// [PATCH] /promotion/:promotion_id
router.patch(
	"/:promotion_id",
	checkAccessToken,
	catchAsync(promotionController.changePromotionStatus)
);

module.exports = router;
