import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type { BillDetailState } from "../types/checkout.type";

const initialState: BillDetailState = {
    first_name: "",
    last_name: "",
    email: "",
    street_address: "",
    city: "",
    country: "",
    zip_code: "",
    phone: "",
    payment_method: "",
};

const billDetailSlice = createSlice({
    name: "billDetail",
    initialState,
    reducers: {
        updateBillDetail: (
            state,
            action: PayloadAction<{
                key: keyof BillDetailState;
                value: string;
            }>,
        ) => {
            state[action.payload.key] = action.payload.value;
        },

        deleteBillDetail: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { updateBillDetail, deleteBillDetail } = billDetailSlice.actions;
export const selectBillDetail = (state: RootState) => state.billDetail;

export default billDetailSlice.reducer;
