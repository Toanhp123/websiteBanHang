import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type { BillDetailState } from "../types/checkout.type";

const initialState: BillDetailState = {
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
    phone: "",
    paymentMethod: "",
    promotion: "",
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
    },
});

export const { updateBillDetail } = billDetailSlice.actions;
export const selectBillDetail = (state: RootState) => state.billDetail;

export default billDetailSlice.reducer;
