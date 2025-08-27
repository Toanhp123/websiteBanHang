import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState } from "../types/checkout.type";
import type { RootState } from "@/stores/store";
import type { Cart } from "@/features/cart/types/cart.type";

const initialState: OrderState = {
    buyItem: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setBuyItem: (state, action: PayloadAction<Cart[]>) => {
            state.buyItem = action.payload;
        },

        clearBuyItem: (state) => {
            state.buyItem = null;
        },
    },
});

export const { setBuyItem, clearBuyItem } = orderSlice.actions;
export const selectBuyNowItem = (state: RootState) => state.order.buyItem;

export default orderSlice.reducer;
