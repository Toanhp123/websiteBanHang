import type { Cart } from "@/features/cart/types/cart.type";
import type { PromotionDetail } from "../types/discount.type";
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
