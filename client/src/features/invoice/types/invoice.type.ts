import type { BillDetailState } from "@/features/checkout/types/checkout.type";

export interface Invoice {
    invoice_id: number | null;
    customer_id: number | null;
    invoice_address_id: number | null;
    invoice_date: string;
    status: "pending" | "paid" | "canceled" | "refunded";
    promotion_id?: number | null;
    discount_amount: number;
    total_amount: number;
    total_final_amount: number;
}

export type InvoiceDetail = {
    invoice_id: number;
    quantity: number;
    unit_final_amount: string;
    discount_amount: string;
    total_final_amount: string;
    product_name: string;
    image_url: string;
};

export interface AllInvoiceDetail {
    invoice_id: number;
    discount_amount: string;
    total_final_amount: string;
    products: InvoiceDetail[];
}

export type AllInvoiceDetailState = {
    items: AllInvoiceDetail[];
};

export interface InvoiceAddress
    extends Omit<BillDetailState, "payment_method"> {
    customer_id: number;
    invoice_address_id: number;
}

export type InvoiceAddressState = {
    items: InvoiceAddress[];
};
