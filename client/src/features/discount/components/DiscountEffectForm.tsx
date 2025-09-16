import { useFormContext, useWatch } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import type { DiscountEffectType } from "../types/discount.type";
import { useEffect, useState } from "react";
import { getAllPromotionEffectType } from "../services/discount.api";
import { Dropdown, InputForDashboard } from "@/components/shared";
import { EffectPromotion } from "@/constants/promotion.constants";

function DiscountEffectForm() {
    const [effectTypeList, setEffectTypeList] = useState<DiscountEffectType[]>(
        [],
    );

    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<AddDiscountFormInputs>();

    const rules = useWatch({ control, name: "rules" });
    const selectedEffect = useWatch({ control, name: "effect.effect_type_id" });

    const handleGetPromotionEffectInfo = async () => {
        try {
            const fields = rules
                .map((rule) => rule.rule_type_id)
                .filter((id) => id !== "");

            const promotionEffectTypeList =
                await getAllPromotionEffectType(fields);

            setEffectTypeList(
                Array.isArray(promotionEffectTypeList)
                    ? promotionEffectTypeList
                    : [],
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (rules[0].rule_type_id) {
            handleGetPromotionEffectInfo();
        }
    }, [rules]);

    return (
        <div className="mt-4 space-y-4 rounded border p-4">
            <h2 className="mb-4 text-xl font-semibold">Add Discount</h2>

            <div className="grid grid-cols-2 gap-8">
                {/* dropdown chọn effect */}
                <Dropdown
                    text="Effect Type"
                    options={effectTypeList.map((e) => ({
                        id: e.effect_type_id,
                        name: e.effect_type_name,
                    }))}
                    register={register("effect.effect_type_id")}
                    error={errors.effect?.effect_type_id?.message}
                />

                {/* input dynamic theo effect */}
                {selectedEffect === EffectPromotion.DISCOUNT_PERCENT && (
                    <InputForDashboard
                        label="Percent (%)"
                        register={register("effect.effect_value")}
                        error={errors.effect?.effect_value?.message}
                    />
                )}

                {selectedEffect === EffectPromotion.DISCOUNT_AMOUNT && (
                    <InputForDashboard
                        label="Amount"
                        register={register("effect.effect_value")}
                        error={errors.effect?.effect_value?.message}
                    />
                )}

                {selectedEffect === EffectPromotion.BUY_X_GIFT_Y && (
                    <div className="grid grid-cols-2 gap-4">
                        <InputForDashboard
                            label="Buy X"
                            register={register("effect.product_id")}
                            error={errors.effect?.product_id?.message}
                        />
                        <InputForDashboard
                            label="Gift Y"
                            register={register("effect.product_id")}
                            error={errors.effect?.product_id?.message}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DiscountEffectForm;
