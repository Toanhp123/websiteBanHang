import type { Cart } from "@/features/cart/types/cart.type";
import axios from "@/utils/axiosInstance";
import type { BillDetailState } from "../types/checkout.type";

export const createBill = async (
    product: Cart[],
    billDetail: BillDetailState,
): Promise<void> => {
    await axios.post("bill", { product, billDetail });
};
