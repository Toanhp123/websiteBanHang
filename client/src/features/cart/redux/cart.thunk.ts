import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteCartAtDatabase,
    deleteItemInCartAtDatabase,
} from "../services/cart.api";

export const deleteCartAsync = createAsyncThunk(
    "cart/deleteCartAsync",
    async () => {
        await deleteCartAtDatabase();
        return [];
    },
);

export const deleteItemInCartSync = createAsyncThunk(
    "cart/deleteItemInCartAsync",
    async (id_product: number) => {
        await deleteItemInCartAtDatabase(id_product);
        return id_product;
    },
);
