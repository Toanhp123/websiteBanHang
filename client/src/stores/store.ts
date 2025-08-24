import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/features/categories/redux/category.slice";
import filterReducer from "@/features/filters/redux/filter.slice";
import cartReducer from "@/features/cart/redux/cart.slice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        filter: filterReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
