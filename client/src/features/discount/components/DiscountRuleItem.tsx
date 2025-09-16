import { useFormContext } from "react-hook-form";
import type { DiscountRuleItemProps } from "../types/discount.type";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { RulePromotion } from "@/constants/promotion.constants";

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
    } = useFormContext<AddDiscountFormInputs>();

    const selectedRuleType = watch(`rules.${index}.rule_type_id`);

    return (
        <div className="mb-3 flex items-center gap-4 rounded border p-3">
            {/* chọn loại rule */}
            <div className="flex-1">
                <Dropdown
                    text="Rule Type"
                    options={index === 0 ? mainRuleType : compatibleRules}
                    register={register(`rules.${index}.rule_type_id`)}
                    error={errors.rules?.[index]?.rule_type_id?.message}
                />
            </div>

            {/* operator */}
            <div className="flex-1">
                <Dropdown
                    options={operators}
                    text="Operator"
                    register={register(`rules.${index}.rule_operator`)}
                    error={errors.rules?.[index]?.rule_operator?.message}
                />
            </div>

            {/* dynamic input */}
            {selectedRuleType === RulePromotion.MIN_INVOICE_AMOUNT && (
                <div className="max-w-[150px]">
                    <InputForDashboard
                        label="Amount"
                        register={register(`rules.${index}.rule_value`)}
                        error={errors.rules?.[index]?.rule_value?.message}
                    />
                </div>
            )}

            {selectedRuleType === RulePromotion.MIN_PRODUCT_QTY && (
                <div className="max-w-[150px]">
                    <InputForDashboard
                        label="Quantity"
                        register={register(`rules.${index}.rule_value`)}
                        error={errors.rules?.[index]?.rule_value?.message}
                    />
                </div>
            )}

            {selectedRuleType === RulePromotion.PRODUCT_CATEGORY && (
                <div className="flex-1">
                    <Dropdown
                        text="Category"
                        options={categories}
                        register={register(
                            `rules.${index}.product_category_id`,
                        )}
                    />
                </div>
            )}

            {selectedRuleType === RulePromotion.PRODUCT_ID && (
                <div className="flex-1">
                    <Dropdown
                        options={productMinimalList}
                        text="Product Name"
                        register={register(`rules.${index}.product_id`)}
                    />
                </div>
            )}

            <div>
                <Button
                    text="Remove"
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
