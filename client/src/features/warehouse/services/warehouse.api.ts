import axios from "@/utils/axiosInstance";
import type {
    ReceiptBasicInfoResponse,
    ReceiptDetail,
} from "../types/warehouse.type";

export const getReceiptBasicInfo = async (
    limit: number,
    page: number,
): Promise<ReceiptBasicInfoResponse> => {
    const res = await axios.get(`warehouse/receipt`, {
        params: { limit, page },
    });

    return res.data;
};

export const getReceiptDetail = async (
    receipt_id: number,
): Promise<ReceiptDetail[]> => {
    const res = await axios.get(`warehouse/receipt/${receipt_id}`);

    return res.data;
};
