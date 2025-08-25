import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, ListCartState } from "../types/cart.type";
import type { RootState } from "@/stores/store";
import { saveCartToDatabase } from "../services/cart.api";

const initialState: ListCartState = {
    items: [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Cart>) {
            const product = action.payload;

            saveCartToDatabase(product);

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
        },

        setCart(state, action: PayloadAction<Cart[]>) {
            state.items = action.payload;
        },

        deleteAllCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, deleteAllCart, setCart } = CartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;

export default CartSlice.reducer;
