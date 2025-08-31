const {
	EffectPromotion,
	RulePromotion,
} = require("../constants/promotion.constants");

const getDiscount = (promotion) => {
	const effect_value = promotion.effect_value;
	const effect_type = promotion.effect_type_name;
	const effect_product_id = promotion.effect_product_id;

	let discount = "0";

	switch (effect_type) {
		case EffectPromotion.DISCOUNT_PERCENT:
			discount = `- ${effect_value}%`;
			break;
		case RulePromotion.MIN_PRODUCT_QTY:
			break;
		case RulePromotion.PRODUCT_CATEGORY:
			break;
		case RulePromotion.PRODUCT_ID:
			break;
		default:
			break;
	}

	return discount;
};

// ========== HANDLER CHO TỪNG LOẠI PROMOTION ==========
const promotionHandlers = {
	[EffectPromotion.DISCOUNT_PERCENT]: (promotionDetail, cart) => {
		const subtotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const discount = subtotal * (promotionDetail.effect_value / 100);
		return { discount, finalTotal: subtotal - discount };
	},

	[EffectPromotion.DISCOUNT_AMOUNT]: (promotionDetail, cart) => {
		const subtotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const discount = promotionDetail.effect_value;
		return { discount, finalTotal: subtotal - discount };
	},

	// TODO: xử lý sau
	[EffectPromotion.BUY_X_GIFT_Y]: (promotionDetail, cart) => {
		const { buy_product_id, buy_quantity, gift_product_id, gift_quantity } =
			promotionDetail.effect;
		const subtotal = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
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

function applyPromotion(promotionDetail, cart) {
	// Tính subtotal trước
	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	let isValid = true;

	// Kiểm tra rule trước
	switch (promotionDetail.rule_type_name) {
		case RulePromotion.MIN_INVOICE_AMOUNT:
			if (!(subtotal >= Number(promotionDetail.rule_value))) {
				isValid = false;
			}
			break;
		case RulePromotion.MIN_PRODUCT_QTY:
			const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
			if (!(totalQty >= Number(promotionDetail.rule_value))) {
				isValid = false;
			}
			break;
		case RulePromotion.PRODUCT_ID:
			if (
				!cart.some(
					(item) =>
						item.product_id === promotionDetail.rule_product_id
				)
			) {
				isValid = false;
			}
			break;
	}
	if (!isValid) {
		return {
			success: false,
			discount: 0,
			finalTotal: subtotal,
		};
	}

	// Chọn handler dựa trên effect.type
	const handler = promotionHandlers[promotionDetail.effect_type_name];
	if (!handler) {
		return {
			success: false,
			discount: 0,
			finalTotal: subtotal,
			message: "Unsupported promotion type",
		};
	}

	// Gọi handler
	const result = handler(promotionDetail, cart);
	return { success: true, ...result };
}

module.exports = {
	applyPromotion,
	getDiscount,
};
