import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    changeQuantityItemCartInDatabase,
    deleteCartAtDatabase,
    deleteItemInCartAtDatabase,
} from "../services/cart.api";
import type { CartUpdate } from "../types/cart.type";

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

export const changeQuantityItemCart = createAsyncThunk(
    "cart/changeQuantityItemCart",
    async ({ quantity, id_product }: CartUpdate) => {
        await changeQuantityItemCartInDatabase(quantity, id_product);
        return { quantity, id_product };
    },
);
