import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, ListCartState } from "../types/cart.type";
import type { RootState } from "@/stores/store";
import { saveCartToDatabase } from "../services/cart.api";
import {
    changeQuantityItemCart,
    deleteCartAsync,
    deleteItemInCartSync,
} from "./cart.thunk";

const initialState: ListCartState = {
    items: [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Cart>) {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.id_product === product.id_product,
            );

            if (existingItem && existingItem.quantity) {
                existingItem.quantity += product.quantity;
            } else {
                state.items.push({
                    id_product: product.id_product,
                    product: product.product,
                    quantity: product.quantity,
                    price: product.price,
                    img: product.img,
                });
            }

            saveCartToDatabase(product);
        },

        setItemToCart(state, action: PayloadAction<Cart[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCartAsync.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        builder.addCase(deleteItemInCartSync.fulfilled, (state, action) => {
            state.items = state.items.filter(
                (item) => item.id_product !== action.payload,
            );
        });

        builder.addCase(changeQuantityItemCart.fulfilled, () => {});
    },
});

export const { addToCart, setItemToCart } = CartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;

export default CartSlice.reducer;
