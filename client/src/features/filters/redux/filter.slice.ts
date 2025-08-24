import type { RootState } from "@/stores/store";
import type { FilterState, SetListFilterPayload } from "../types/filter.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TypeFilter } from "@/constants/typeFilter";

const initialState: FilterState = {
    category: TypeFilter.ALL,
    price: null,
    productType: TypeFilter.ALL,
    available: TypeFilter.ALL,
};

export const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setListFilter(state, action: PayloadAction<SetListFilterPayload>) {
            switch (action.payload.optionsType) {
                case TypeFilter.CATEGORY:
                    state.category = action.payload.selectName;
                    break;
                case TypeFilter.PRODUCT_TYPE:
                    state.productType = action.payload.selectName;
                    break;
                case TypeFilter.AVAILABLE:
                    state.available = action.payload.selectName;
                    break;
            }
        },

        // TODO: cần làm gì đó
        deleteFilter(state, action: PayloadAction<string>) {
            if ((action.payload as keyof FilterState) !== "price") {
                state[action.payload as keyof FilterState] = TypeFilter.ALL;
            }
        },

        deleteAllFilter(state) {
            state.available = TypeFilter.ALL;
            state.category = TypeFilter.ALL;
            state.price = null;
            state.productType = TypeFilter.ALL;
        },
    },
});

export const { setListFilter, deleteFilter, deleteAllFilter } =
    FilterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;

export default FilterSlice.reducer;
