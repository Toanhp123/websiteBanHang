import { useFormContext, useWatch } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import type { DiscountEffectType } from "../types/discount.type";
import { useEffect, useState } from "react";
import { getAllPromotionEffectType } from "../services/discount.api";
import { Dropdown, InputForDashboard } from "@/components/shared";
import { EffectPromotion } from "@/constants/promotion.constants";
import { getProductMinimal } from "@/features/products/services/product.api";
import type { ProductMinimal } from "@/features/products/types/product.type";

function DiscountEffectForm() {
    const [productList, setProductList] = useState<ProductMinimal[]>([]);
    const [effectTypeList, setEffectTypeList] = useState<DiscountEffectType[]>(
        [],
    );

    const {
        control,
        register,
        formState: { errors },
        setValue,
    } = useFormContext<AddDiscountFormInputs>();

    const rules = useWatch({ control, name: "rules" });
    const selectedEffectID = useWatch({
        control,
        name: "effect.effect_type_id",
    });

    const formatDataProductMinimal = productList.map((product) => ({
        id: product.product_id,
        name: product.product_name,
    }));

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

    const handleGetAllProduct = async () => {
        try {
            const productMinimalList = await getProductMinimal();

            if (productMinimalList) {
                setProductList(productMinimalList);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!selectedEffectID) return;

        const selectedEffect = effectTypeList.find(
            (ef) => ef.effect_type_id.toString() === selectedEffectID,
        );

        setValue(
            `effect.effect_type_description`,
            selectedEffect?.effect_type_description,
        );
        setValue(`effect.effect_value`, "");
        setValue(`effect.product_id`, "");

        if (selectedEffectID === "3") {
            handleGetAllProduct();
        }
    }, [selectedEffectID]);

    useEffect(() => {
        if (rules?.[0]?.rule_type_id) {
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
                {selectedEffectID === EffectPromotion.DISCOUNT_PERCENT && (
                    <InputForDashboard
                        label="Percent (%)"
                        register={register("effect.effect_value")}
                        error={errors.effect?.effect_value?.message}
                    />
                )}

                {selectedEffectID === EffectPromotion.DISCOUNT_AMOUNT && (
                    <InputForDashboard
                        label="Amount"
                        register={register("effect.effect_value")}
                        error={errors.effect?.effect_value?.message}
                    />
                )}

                {selectedEffectID === EffectPromotion.BUY_X_GIFT_Y && (
                    <Dropdown
                        text="Gift"
                        options={formatDataProductMinimal}
                        register={register("effect.product_id")}
                        error={errors.effect?.product_id?.message}
                    />
                )}
            </div>
        </div>
    );
}

export default DiscountEffectForm;
