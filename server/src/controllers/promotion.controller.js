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
}

module.exports = new PromotionController();
