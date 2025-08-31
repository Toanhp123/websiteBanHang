import {
    EffectPromotion,
    RulePromotion,
} from "@/constants/promotion.constants";
import type { PromotionDetail } from "@/features/checkout/types/checkout.type";

export const getPriceWithDiscount = (
    price: number,
    promotion: PromotionDetail,
): number => {
    const rule_value = promotion.rule_value;
    const rule_type = promotion.rule_type_name;
    const rule_product_id = promotion.rule_product_id;

    const effect_value = promotion.effect_value;
    const effect_type = promotion.effect_type_name;
    const effect_product_id = promotion.effect_product_id;

    let priceWithDiscount = price;

    switch (rule_type) {
        case RulePromotion.MIN_INVOICE_AMOUNT:
            if (price >= Number(rule_value)) {
                if (effect_type === EffectPromotion.DISCOUNT_PERCENT) {
                    priceWithDiscount = (price * Number(effect_value)) / 100;
                }
            }

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

    return priceWithDiscount;
};

export const getDiscount = (promotion: PromotionDetail) => {
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
