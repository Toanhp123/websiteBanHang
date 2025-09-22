const promotionService = require("../services/promotion.service");

class PromotionController {
	// [GET] /promotion/:promotion_id
	async getDetailPromotion(req, res) {
		const { promotion_id } = req.params;

		const promotion = await promotionService.getDetailPromotion(
			promotion_id
		);

		res.json(promotion);
	}

	// [POST] / promotion/check
	async checkPromotionCanApply(req, res) {
		const { promotion, cart } = req.body;

		const canApply = await promotionService.checkPromotionCanApply(
			promotion,
			cart
		);

		res.json(canApply);
	}

	// [GET] /promotion/rule/type
	async getAllPromotionRuleType(req, res) {
		const { rangeApply } = req.query;

		const ruleType = await promotionService.getAllPromotionRuleType(
			rangeApply
		);

		res.json(ruleType);
	}

	// [GET] /promotion/effect/type
	async getAllPromotionEffectType(req, res) {
		const listRuleType = req.query["listRuleType[]"];

		const effectType = await promotionService.getAllPromotionEffectType(
			listRuleType
		);

		res.json(effectType);
	}

	// [POST] /promotion/create
	async createPromotion(req, res) {
		const { ...data } = req.body;

		const message = await promotionService.createPromotion(data);

		res.json(message);
	}

	// [GET] /promotion/product
	async getDiscountForProduct(req, res) {}

	// [GET] /promotion
	async getAllPromotion(req, res) {
		const { page, itemPerPage } = req.query;
		const limit = Number(itemPerPage);
		const offset = (page - 1) * itemPerPage;

		const promotion = await promotionService.getAllPromotion(limit, offset);

		res.json(promotion);
	}

	// [PATCH] /promotion/:promotion_id
	async changePromotionStatus(req, res) {
		const { promotion_id } = req.params;
		const { promotion_status } = req.body;

		const message = await promotionService.changePromotionStatus(
			promotion_id,
			promotion_status
		);

		res.json(message);
	}

	// [GET] /promotion/thisCustomer
	async getAllPromotionThisCustomer(req, res) {
		const { id } = req.user;

		const allPromotion = await promotionService.getAllPromotionThisCustomer(
			id
		);

		res.json(allPromotion);
	}
}

module.exports = new PromotionController();
