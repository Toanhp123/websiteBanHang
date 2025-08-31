import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type { Invoice } from "../types/invoice.type";

const initialState: Invoice = {
    invoice_id: null,
    customer_id: null,
    invoice_address_id: null,
    invoice_date: "",
    status: "pending",
    promotion_id: null,
    discount_amount: 0,
    total_amount: 0,
    total_final_amount: 0,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setInvoice: (state, action: PayloadAction<Invoice>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { setInvoice } = invoiceSlice.actions;
export const selectInvoice = (state: RootState) => state.invoice;

export default invoiceSlice.reducer;
