const {
	EffectPromotion,
	RulePromotion,
} = require("../constants/promotion.constants");

// ========== FORMAT HIỂN THỊ ==========
const getDiscount = (promotion) => {
	const { effect_type_name, effect_value } = promotion;

	switch (effect_type_name) {
		case EffectPromotion.DISCOUNT_PERCENT:
			return `- ${effect_value}%`;
		case EffectPromotion.DISCOUNT_AMOUNT:
			return `- ${effect_value}₫`;
		case EffectPromotion.BUY_X_GIFT_Y:
			return `Mua ${promotion.effect.buy_quantity} tặng ${promotion.effect.gift_quantity}`;
		default:
			return "";
	}
};

// ========== HANDLER CHO TỪNG LOẠI PROMOTION ==========
const promotionHandlers = {
	[EffectPromotion.DISCOUNT_PERCENT]: (promotionDetail, cart, subtotal) => {
		const discount =
			subtotal * (promotionDetail.effects.effect_value / 100);
		return { discount, finalTotal: subtotal - discount };
	},

	[EffectPromotion.DISCOUNT_AMOUNT]: (promotionDetail, cart, subtotal) => {
		const discount = promotionDetail.effects.effect_value;
		return { discount, finalTotal: subtotal - discount };
	},

	[EffectPromotion.BUY_X_GIFT_Y]: (promotionDetail, cart, subtotal) => {
		const { buy_product_id, buy_quantity, gift_product_id, gift_quantity } =
			promotionDetail.effect;
		let discount = 0;

		const itemX = cart.find((item) => item.product_id === buy_product_id);
		if (itemX && itemX.quantity >= buy_quantity) {
			const freeQty =
				Math.floor(itemX.quantity / buy_quantity) * gift_quantity;
			const itemY = cart.find(
				(item) => item.product_id === gift_product_id
			);

			if (itemY) {
				// giảm giá sản phẩm Y
				discount = itemY.price * Math.min(itemY.quantity, freeQty);
			} else {
				// hoặc thêm Y miễn phí vào giỏ
				cart.push({
					product_id: gift_product_id,
					price: 0,
					quantity: freeQty,
				});
			}
		}

		return { discount, finalTotal: subtotal - discount };
	},
};

// ========== RULE CHECKER ==========
function checkRule(rule, cart, subtotal) {
	switch (rule.rule_type_id.toString()) {
		case RulePromotion.MIN_INVOICE_AMOUNT:
			return subtotal >= Number(rule.rule_value);
		case RulePromotion.MIN_PRODUCT_QTY:
			const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
			return totalQty >= Number(rule.rule_value);

		case RulePromotion.PRODUCT_ID:
			return cart.some(
				(item) => item.product_id === rule.rule_product_id
			);

		default:
			return true; // rule chưa hỗ trợ thì coi như pass
	}
}

// ========== ÁP PROMOTION ==========
function applyPromotion(promotionDetail, cart) {
	const subtotal = cart.reduce((sum, item) => {
		const price =
			item.discountPrice !== null && item.discountPrice !== undefined
				? item.discountPrice
				: item.price;

		return sum + price * item.quantity;
	}, 0);

	// Nếu có nhiều rule thì duyệt hết
	const rules = Array.isArray(promotionDetail.rules)
		? promotionDetail.rules
		: [promotionDetail];

	for (const rule of rules) {
		const ok = checkRule(rule, cart, subtotal);

		if (!ok) {
			return {
				success: false,
				discount: 0,
				finalTotal: subtotal,
				reason: `Không thỏa điều kiện: ${rule.rule_type_name}`,
			};
		}
	}

	const handler = promotionHandlers[promotionDetail.effects.effect_type_id];
	if (!handler) {
		return {
			success: false,
			discount: 0,
			finalTotal: subtotal,
			reason: "Unsupported promotion type",
		};
	}

	const result = handler(promotionDetail, cart, subtotal);
	console.log(result);

	return { success: true, ...result };
}

module.exports = {
	applyPromotion,
	getDiscount,
};
