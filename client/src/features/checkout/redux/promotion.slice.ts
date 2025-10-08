import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/stores/store";
import type { PromotionDetail } from "@/features/discount/types/discount.type";

const initialState: PromotionDetail = {
    promotion_id: null,
    promotion_name: "",
    valid_from: "",
    valid_to: "",
    distribution_type: "share",
    range_apply: "invoice",
    promotion_status: "active",
    created_at: "",
    rules: [],
    effects: {
        effect_id: 0,
        effect_value: "",
        product_id: null,
        effect_type_id: 0,
        effect_type: "",
        effect_description: "",
    },
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        updatePromotion: <K extends keyof PromotionDetail>(
            state: PromotionDetail,
            action: PayloadAction<{
                key: K;
                value: PromotionDetail[K];
            }>,
        ) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

export const { updatePromotion } = promotionSlice.actions;
export const selectPromotion = (state: RootState) => state.promotion;

export default promotionSlice.reducer;
