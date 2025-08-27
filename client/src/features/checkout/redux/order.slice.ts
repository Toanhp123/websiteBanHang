import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderState } from "../types/order.slice";
import type { Product } from "@/features/products/types/product.type";
import type { RootState } from "@/stores/store";

const initialState: OrderState = {
    buyNowItem: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setBuyNowItem: (state, action: PayloadAction<Product>) => {
            state.buyNowItem = action.payload;
        },
        clearBuyNowItem: (state) => {
            state.buyNowItem = null;
        },
    },
});

export const { setBuyNowItem, clearBuyNowItem } = orderSlice.actions;
export const selectBuyNowItem = (state: RootState) => state.order.buyNowItem;

export default orderSlice.reducer;
