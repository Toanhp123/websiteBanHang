export type ReceiptBasicInfo = {
    receipt_id: number;
    supplier_name: string;
    warehouse_name: string;
    employee_first_name: string;
    employee_last_name: string;
    receipt_date: string;
};

export type ReceiptBasicInfoResponse = {
    warehouseReceiptList: ReceiptBasicInfo[];
    hasMore: boolean;
};

export type EditPopupPros = {
    id?: string;
    popup: (menu: string, value: string) => void;
};

export type ReceiptDetail = {
    product_code: string;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: string;
};

export type ExportBasicInfo = {
    export_id: number;
    employee_first_name: string;
    employee_last_name: string;
    export_date: string;
    invoice_id: number;
    reason: number;
};

export type ExportBasicInfoResponse = {
    warehouseExportList: ExportBasicInfo[];
    hasMore: boolean;
};

export type ExportDetail = {
    product_code: string;
    product_id: number;
    product_name: string;
    quantity: number;
    warehouse_id: number;
    warehouse_name: string;
    location: string;
};

export type InventoryAuditBasicInfo = {
    audit_id: number;
    audit_date: string;
    old_quantity: number;
    new_quantity: number;
    change_amount: number;
    action: string;
    employee_first_name: string;
    employee_last_name: string;
    warehouse_name: string;
};

export type InventoryAuditBasicInfoResponse = {
    inventoryAuditList: InventoryAuditBasicInfo[];
    hasMore: boolean;
};

export type Warehouse = {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
    priority: number;
    employee_first_name: string;
    employee_last_name: string;
    employee_id: number;
};
