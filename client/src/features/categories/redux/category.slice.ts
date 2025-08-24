import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Categories, CategoryState } from "../types/categories.type";
import type { RootState } from "@/stores/store";
import { TypeFilter } from "@/constants/typeFilter";

const initialState: CategoryState = {
    type: TypeFilter.CATEGORY,
    categories: [],
};

export const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Categories[]>) {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = CategorySlice.actions;
export const selectCategories = (state: RootState) => state.category;

export default CategorySlice.reducer;
