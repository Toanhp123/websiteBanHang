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
