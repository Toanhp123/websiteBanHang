import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type {
    InvoiceAddress,
    InvoiceAddressState,
} from "../types/invoice.type";
import { deleteShippingAddressAsync } from "./shippingAddress.thunk";

const initialState: InvoiceAddressState = {
    items: [],
};

const shippingAddressSlice = createSlice({
    name: "shippingAddress",
    initialState,
    reducers: {
        setShippingAddress: (
            state,
            action: PayloadAction<InvoiceAddress[]>,
        ) => {
            state.items = action.payload;
        },

        addShippingAddress: (state, action: PayloadAction<InvoiceAddress>) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            deleteShippingAddressAsync.fulfilled,
            (state, action) => {
                state.items = state.items.filter(
                    (item) => item.invoice_address_id !== action.payload,
                );
            },
        );
    },
});

export const { setShippingAddress, addShippingAddress } =
    shippingAddressSlice.actions;
export const selectShippingAddress = (state: RootState) =>
    state.shippingAddress.items;

export default shippingAddressSlice.reducer;
