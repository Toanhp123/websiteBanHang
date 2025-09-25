import axios from "@/utils/axiosInstance";
import type {
    ExportBasicInfoResponse,
    ExportDetail,
    Inventory,
    InventoryAuditBasicInfoResponse,
    ReceiptBasicInfoResponse,
    ReceiptDetail,
    Warehouse,
} from "../types/warehouse.type";
import type { WarehouseImportFormInputs } from "../validations/warehouseImport.schema";

export const getReceiptBasicInfo = async (
    limit: number,
    page: number,
    option: "supplier" | "customer",
): Promise<ReceiptBasicInfoResponse> => {
    const res = await axios.get(`warehouse/receipt`, {
        params: { limit, page, option },
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

export const editWarehouse = async (
    warehouse_id: number,
    changes: Record<string, unknown>,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.put(`warehouse/${warehouse_id}`, {
        changes,
    });

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

export const getInventoryInWarehouse = async (
    warehouse_id: number,
): Promise<Inventory[]> => {
    const res = await axios.get(`warehouse/inventory/${warehouse_id}`);

    return res.data;
};

export const getInventoryInWarehouseBySupplier = async (
    warehouse_id: number,
    supplier_id: string,
): Promise<Inventory[]> => {
    const res = await axios.get(
        `warehouse/inventory/${warehouse_id}?supplier_id=${supplier_id}`,
    );

    return res.data;
};

export const createWarehouseImport = async (
    data: WarehouseImportFormInputs,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.post(`warehouse/import`, { data });

    return res.data;
};
