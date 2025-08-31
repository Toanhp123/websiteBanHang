import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type {
    AllInvoiceDetail,
    AllInvoiceDetailState,
} from "../types/invoice.type";
import { deleteOneItemInvoice } from "./allInvoiceDetail.thunk";

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
            state.items = state.items.filter(
                (item) => item.invoice_id !== action.payload,
            );
        });
    },
});

export const { setAllInvoiceDetail } = allInvoiceDetailSlice.actions;
export const selectAllInvoiceDetail = (state: RootState) =>
    state.allInvoiceDetail.items;

export default allInvoiceDetailSlice.reducer;
