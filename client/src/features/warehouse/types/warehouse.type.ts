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
