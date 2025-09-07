import axios from "@/utils/axiosInstance";
import type { ReceiptBasicInfoResponse } from "../types/warehouse.type";

export const getReceiptBasicInfo = async (
    limit: number,
    page: number,
): Promise<ReceiptBasicInfoResponse> => {
    const res = await axios.get(`warehouse/receipt`, {
        params: { limit, page },
    });

    return res.data;
};
