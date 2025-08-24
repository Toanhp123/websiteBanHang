import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, ListCartState } from "../types/cart.type";
import type { RootState } from "@/stores/store";

const initialState: ListCartState = {
    items: [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // TODO: cần làm thêm chức năng mua số lượng
        addToCart(state, action: PayloadAction<Cart>) {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === product.id,
            );

            if (existingItem && existingItem.quantity) {
                existingItem.quantity += product.quantity;
            } else {
                state.items.push({
                    id: product.id,
                    product: product.product,
                    quantity: product.quantity,
                    price: product.price,
                    img: product.img,
                });
            }
        },

        deleteAllCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, deleteAllCart } = CartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;

export default CartSlice.reducer;
