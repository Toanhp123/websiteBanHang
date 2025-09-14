import type { Cart } from "@/features/cart/types/cart.type";
import type {
    DiscountEffectType,
    DiscountRuleType,
    PromotionDetail,
} from "../types/discount.type";
import axios from "@/utils/axiosInstance";

export const getPromotion = async (
    promotion: string,
): Promise<PromotionDetail> => {
    const res = await axios.get(`promotion/${promotion}`);

    return res.data;
};

export const checkPromotionCanApply = async (
    promotion: PromotionDetail,
    cart: Cart[],
): Promise<{
    success: boolean;
    discount: number;
    finalTotal: number;
}> => {
    const res = await axios.post(`promotion/check`, {
        promotion,
        cart,
    });

    return res.data;
};

export const getAllPromotionRuleType = async (
    rangeApply: string,
): Promise<DiscountRuleType[]> => {
    const res = await axios.get(`promotion/rule/type`, {
        params: { rangeApply },
    });

    return res.data;
};

export const getAllPromotionEffectType = async (
    ruleType: string[],
): Promise<DiscountEffectType[]> => {
    const res = await axios.get(`promotion/effect/type`, {
        params: {
            listRuleType: ruleType,
        },
    });

    return res.data;
};
