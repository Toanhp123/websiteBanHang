import axios from "@/utils/axiosInstance";
import type {
    AllInvoiceDetail,
    GetOrderListResponse,
    Invoice,
    InvoiceAddress,
    InvoiceDetail,
} from "../types/invoice.type";

export const getInvoice = async (invoice_id: number): Promise<Invoice> => {
    const res = await axios.get<Invoice>(`invoice/${invoice_id}`);

    return res.data;
};

export const getInvoiceDetail = async (
    invoice_id: number,
): Promise<InvoiceDetail[]> => {
    const res = await axios.get<InvoiceDetail[]>(
        `invoice/detail/${invoice_id}`,
    );

    return res.data;
};

export const getAllInvoiceDetail = async (): Promise<AllInvoiceDetail[]> => {
    const res = await axios.get<AllInvoiceDetail[]>(`invoice/detail`);

    return res.data;
};

export const deleteInvoice = async (invoice_id: number): Promise<void> => {
    await axios.delete(`invoice/${invoice_id}`);
};

export const getAllAddressShipping = async (): Promise<InvoiceAddress[]> => {
    const res = await axios.get<InvoiceAddress[]>("/invoice/address");

    return res.data;
};

export const createInvoiceAddress = async ({ ...invoiceAddress }) => {
    const res = await axios.post<InvoiceAddress>("/invoice/address", {
        invoiceAddress,
    });

    return res.data;
};

export const deleteAddressShipping = async (invoice_address_id: number) => {
    await axios.delete<InvoiceAddress>(
        `/invoice/address/${invoice_address_id}`,
    );
};

export const getOrderList = async (
    limit: number,
    page: number,
): Promise<GetOrderListResponse> => {
    const res = await axios.get("/invoice/ordersList", {
        params: { limit, page },
    });

    return res.data;
};

export const updateOrderStatus = async (status: string, invoice_id: number) => {
    console.log(status, invoice_id);

    await axios.patch(`/invoice/orders/${invoice_id}`, { status });
};
