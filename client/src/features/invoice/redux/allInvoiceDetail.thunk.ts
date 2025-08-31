import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteInvoice } from "../services/invoice.api";

export const deleteOneItemInvoice = createAsyncThunk(
    "cart/deleteOneItemInvoice",
    async (invoice_id: number) => {
        await deleteInvoice(invoice_id);

        return invoice_id;
    },
);
