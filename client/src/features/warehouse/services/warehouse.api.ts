import axios from "@/utils/axiosInstance";
import type {
    ExportBasicInfoResponse,
    ExportDetail,
    InventoryAuditBasicInfoResponse,
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

export const getExportBasicInfo = async (
    limit: number,
    page: number,
): Promise<ExportBasicInfoResponse> => {
    const res = await axios.get(`warehouse/export`, {
        params: { limit, page },
    });

    return res.data;
};

export const getExportDetail = async (
    export_id: number,
): Promise<ExportDetail[]> => {
    const res = await axios.get(`warehouse/export/${export_id}`);

    return res.data;
};

export const getInventoryAuditBasicInfo = async (
    limit: number,
    page: number,
): Promise<InventoryAuditBasicInfoResponse> => {
    const res = await axios.get(`warehouse/inventoryAudit`, {
        params: { limit, page },
    });

    return res.data;
};
