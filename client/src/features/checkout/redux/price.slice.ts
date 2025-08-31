import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type { PriceState } from "../types/checkout.type";

const initialState: PriceState = {
    discount: 0,
    final_total: 0,
};

const priceSlice = createSlice({
    name: "price",
    initialState,
    reducers: {
        setDiscountAmount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },

        setFinalTotal: (state, action: PayloadAction<number>) => {
            state.final_total = action.payload;
        },
    },
});

export const { setDiscountAmount, setFinalTotal } = priceSlice.actions;
export const selectFinalTotal = (state: RootState) => state.price;

export default priceSlice.reducer;
