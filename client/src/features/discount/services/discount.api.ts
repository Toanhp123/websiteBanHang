import type { Cart } from "@/features/cart/types/cart.type";
import type {
    DiscountEffectType,
    DiscountRuleType,
    PromotionDetail,
    PromotionInfo,
} from "../types/discount.type";
import axios from "@/utils/axiosInstance";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";

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

export const createDiscount = async (
    data: AddDiscountFormInputs,
): Promise<{ message: string; success: string }> => {
    const res = await axios.post(`promotion/create`, { ...data });

    return res.data;
};

export const getDiscountForProduct = async () => {
    const res = await axios.get(`promotion/product`);

    return res.data;
};

export const getPromotionInfo = async (
    page: number,
    itemPerPage: number,
): Promise<{ data: PromotionInfo[]; total: number }> => {
    const res = await axios.get(`promotion`, { params: { page, itemPerPage } });

    return res.data;
};

export const changePromotionStatus = async (
    promotion_id: number,
    promotion_status: string,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.patch(`promotion/${promotion_id}`, {
        promotion_status,
    });

    return res.data;
};

export const getAllPromotionThisCustomer = async (): Promise<
    PromotionDetail[]
> => {
    const res = await axios.get(`promotion/thisCustomer`);

    return res.data;
};
