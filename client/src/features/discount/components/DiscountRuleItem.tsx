import { useFormContext } from "react-hook-form";
import type { DiscountRuleItemProps } from "../types/discount.type";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { RulePromotion } from "@/constants/promotion.constants";
import { useEffect } from "react";

const operators = [">=", "<=", "==", ">", "<"].map((op) => ({
    id: op,
    name: op,
}));

function DiscountRuleItem({
    index,
    remove,
    mainRuleType,
    compatibleRules,
    productMinimalList,
    categories,
}: DiscountRuleItemProps) {
    const {
        register,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext<AddDiscountFormInputs>();

    const selectedRuleTypeId = watch(`rules.${index}.rule_type_id`);

    useEffect(() => {
        if (!selectedRuleTypeId) return;

        const selectedRuleType = (
            index === 0 ? mainRuleType : compatibleRules
        ).find((r) => r.id.toString() === selectedRuleTypeId);

        if (!selectedRuleType) return;

        setValue(`rules.${index}.rule_type_description`, selectedRuleType.name);
        setValue(
            `rules.${index}.rule_value_template`,
            selectedRuleType.optionData || "",
        );
        setValue(`rules.${index}.rule_value`, "");
        setValue(`rules.${index}.product_id`, "");
        setValue(`rules.${index}.product_category_id`, "");
    }, [selectedRuleTypeId]);

    return (
        <div className="mb-3 flex items-center gap-4 rounded border p-3">
            <div className="flex-1">
                <Dropdown
                    text="Loại Rule"
                    options={index === 0 ? mainRuleType : compatibleRules}
                    register={register(`rules.${index}.rule_type_id`)}
                    error={errors.rules?.[index]?.rule_type_id?.message}
                />
            </div>

            <div className="flex-1">
                <Dropdown
                    options={operators}
                    text="Toán tử"
                    register={register(`rules.${index}.rule_operator`)}
                    error={errors.rules?.[index]?.rule_operator?.message}
                />
            </div>

            {selectedRuleTypeId === RulePromotion.MIN_INVOICE_AMOUNT && (
                <div className="max-w-[150px]">
                    <InputForDashboard
                        label="Số tiền"
                        register={register(`rules.${index}.rule_value`)}
                        error={errors.rules?.[index]?.rule_value?.message}
                    />
                </div>
            )}

            {selectedRuleTypeId === RulePromotion.MIN_PRODUCT_QTY && (
                <div className="max-w-[150px]">
                    <InputForDashboard
                        label="Số lượng"
                        register={register(`rules.${index}.rule_value`)}
                        error={errors.rules?.[index]?.rule_value?.message}
                    />
                </div>
            )}

            {selectedRuleTypeId === RulePromotion.PRODUCT_CATEGORY && (
                <div className="flex-1">
                    <Dropdown
                        text="Danh mục"
                        options={categories}
                        register={register(
                            `rules.${index}.product_category_id`,
                        )}
                    />
                </div>
            )}

            {selectedRuleTypeId === RulePromotion.PRODUCT_ID && (
                <div className="flex-1">
                    <Dropdown
                        options={productMinimalList}
                        text="Tên sản phẩm"
                        register={register(`rules.${index}.product_id`)}
                    />
                </div>
            )}

            <div>
                <Button
                    text="Xóa"
                    bgColor="bg-red-100"
                    borderColor="border-red-300"
                    textColor="text-red-500"
                    textSize="small"
                    hoverColor="hover:bg-red-500"
                    type="small"
                    onClick={() => remove(index)}
                />
            </div>
        </div>
    );
}

export default DiscountRuleItem;
