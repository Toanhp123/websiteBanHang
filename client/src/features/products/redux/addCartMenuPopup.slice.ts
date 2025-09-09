import type { RootState } from "@/stores/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuPopupState } from "../types/product.type";

const initialState: MenuPopupState = {
    menu: false,
};

const addCartMenuPopupSlice = createSlice({
    name: "addCartMenuPopup",
    initialState,
    reducers: {
        setStateMenuPopup: (state, action: PayloadAction<boolean>) => {
            state.menu = action.payload;
        },
    },
});

export const { setStateMenuPopup } = addCartMenuPopupSlice.actions;
export const selectStateAddCartMenuPopup = (state: RootState) =>
    state.addCartMenuPopup.menu;

export default addCartMenuPopupSlice.reducer;
