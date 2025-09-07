import axios from "@/utils/axiosInstance";
import type {
    ExportBasicInfoResponse,
    ExportDetail,
    InventoryAuditBasicInfoResponse,
    ReceiptBasicInfoResponse,
    ReceiptDetail,
    Warehouse,
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

export const getAllWarehouse = async (): Promise<Warehouse[]> => {
    const res = await axios.get(`warehouse`);

    return res.data;
};

export const getWarehouseByID = async (
    warehouse_id: number,
): Promise<Warehouse> => {
    const res = await axios.get(`warehouse/${warehouse_id}`);

    return res.data;
};

export const editWarehouse = async ({
    ...UpdateWarehouseData
}): Promise<{ message: string; success: boolean }> => {
    const res = await axios.put(
        `warehouse/${UpdateWarehouseData.warehouse_id}`,
        { UpdateWarehouseData },
    );

    return res.data;
};

export const deleteWarehouse = async (
    warehouse_id: number,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.delete(`warehouse/${warehouse_id}`);

    return res.data;
};

export const addWarehouse = async ({
    ...WarehouseInfo
}): Promise<{ message: string; success: boolean }> => {
    const res = await axios.post(`warehouse/addWarehouse`, { WarehouseInfo });

    return res.data;
};
