import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type {
    AllInvoiceDetail,
    AllInvoiceDetailState,
} from "../types/invoice.type";
import {
    deleteOneItemInvoice,
    refundedInvoiceAsync,
} from "./allInvoiceDetail.thunk";

const initialState: AllInvoiceDetailState = {
    items: [],
};

const allInvoiceDetailSlice = createSlice({
    name: "allInvoiceDetail",
    initialState,
    reducers: {
        setAllInvoiceDetail: (
            state,
            action: PayloadAction<AllInvoiceDetail[]>,
        ) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteOneItemInvoice.fulfilled, (state, action) => {
            const invoice = state.items.find(
                (invoice) => invoice.invoice_id === action.payload,
            );

            if (invoice) {
                invoice.status = "cancelled";
            }
        });

        builder.addCase(refundedInvoiceAsync.fulfilled, (state, action) => {
            const invoice = state.items.find(
                (invoice) => invoice.invoice_id === action.payload,
            );

            if (invoice) {
                invoice.status = "refund_requested";
            }
        });
    },
});

export const { setAllInvoiceDetail } = allInvoiceDetailSlice.actions;
export const selectAllInvoiceDetail = (state: RootState) =>
    state.allInvoiceDetail.items;

export default allInvoiceDetailSlice.reducer;
