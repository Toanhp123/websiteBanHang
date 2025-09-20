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

    // Effect
    effect_type_name: "",
    effect_product_id: null,
    effect_value: "",

    // Rule
    rule_type_name: "",
    rule_operator: ">=",
    rule_value: "",
    rule_product_id: null,
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
