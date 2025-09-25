import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteInvoice, refundedInvoice } from "../services/invoice.api";

export const deleteOneItemInvoice = createAsyncThunk(
    "invoice/deleteOneItemInvoice",
    async (invoice_id: number) => {
        await deleteInvoice(invoice_id);

        return invoice_id;
    },
);

export const refundedInvoiceAsync = createAsyncThunk(
    "invoice/refundedInvoiceAsync",
    async (invoice_id: number) => {
        await refundedInvoice(invoice_id);

        return invoice_id;
    },
);
