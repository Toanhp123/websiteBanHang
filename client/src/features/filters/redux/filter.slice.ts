import type { RootState } from "@/stores/store";
import type { FilterState, SetListFilterPayload } from "../types/filter.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TypeFilter } from "@/constants/typeFilter";

// TODO: cầm làm gì đó với biến price
const initialState: FilterState = {
    category: TypeFilter.ALL,
    // price: null,
    product_type: TypeFilter.ALL,
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
                    state.product_type = action.payload.selectName;
                    break;
                case TypeFilter.AVAILABLE:
                    state.available = action.payload.selectName;
                    break;
            }
        },

        deleteFilter(state, action: PayloadAction<string>) {
            state[action.payload as keyof FilterState] = TypeFilter.ALL;
        },

        deleteAllFilter(state) {
            state.available = TypeFilter.ALL;
            state.category = TypeFilter.ALL;
            // state.price = null;
            state.product_type = TypeFilter.ALL;
        },
    },
});

export const { setListFilter, deleteFilter, deleteAllFilter } =
    FilterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;

export default FilterSlice.reducer;
