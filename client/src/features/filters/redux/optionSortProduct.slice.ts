import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SortOptions, SortOptionsState } from "../types/filter.type";
import type { RootState } from "@/stores/store";

const initialState: SortOptionsState = {
    option: "latest",
};

export const OptionSortProduct = createSlice({
    name: "optionSortProduct",
    initialState,
    reducers: {
        setOption(state, action: PayloadAction<SortOptions>) {
            state.option = action.payload;
        },
    },
});

export const { setOption } = OptionSortProduct.actions;
export const selectOptionSortProduct = (state: RootState) =>
    state.optionSortProduct.option;

export default OptionSortProduct.reducer;
