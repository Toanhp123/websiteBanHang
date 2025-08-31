import type { Cart } from "@/features/cart/types/cart.type";
import axios from "@/utils/axiosInstance";
import type { BillDetailState, PromotionDetail } from "../types/checkout.type";
import type { Invoice } from "@/features/invoice/types/invoice.type";

export const createBill = async (
    cart: Cart[],
    billDetail: BillDetailState,
    promotion_id: number | null,
    discount: number,
    final_total: number,
): Promise<Invoice> => {
    const res = await axios.post("invoice", {
        cart,
        billDetail,
        promotion_id,
        discount,
        final_total,
    });

    return res.data;
};

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
