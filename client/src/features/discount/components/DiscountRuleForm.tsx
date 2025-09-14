import { useFieldArray, useFormContext } from "react-hook-form";
import DiscountRuleItem from "./DiscountRuleItem";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import { getAllPromotionRuleType } from "../services/discount.api";
import { useEffect, useState } from "react";
import type {
    CompatibleRuleType,
    DiscountRuleType,
} from "../types/discount.type";
import type { Categories } from "@/features/categories/types/categories.type";
import type { ProductMinimal } from "@/features/products/types/product.type";
import { getProductMinimal } from "@/features/products/services/product.api";
import { getCategories } from "@/features/categories/services/getCategories.api";

function DiscountRuleList() {
    const [ruleTypeList, setRuleTypeList] = useState<DiscountRuleType[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [productList, setProductList] = useState<ProductMinimal[]>([]);
    const [compatibleRuleType, setCompatibleRuleType] = useState<
        CompatibleRuleType[]
    >([]);

    const {
        watch,
        formState: { errors },
    } = useFormContext<AddDiscountFormInputs>();

    const { fields, append, remove } = useFieldArray({
        name: "rules",
    });

    const mainRuleSelected = watch("rules.0.rule_type_id");
    const rangeApply = watch("info.range_apply");

    const formatDataMainRuleType = ruleTypeList.map((ruleType) => ({
        id: ruleType.rule_type_id,
        name: ruleType.rule_type_description,
    }));
    const formatDataCompatibleRuleType = compatibleRuleType.map((ruleType) => ({
        id: ruleType.rule_type_id,
        name: ruleType.rule_type_description,
    }));
    const formatDataProductMinimal = productList.map((product) => ({
        id: product.product_id,
        name: product.product_name,
    }));
    const formatDataCategories = categories.map((category) => ({
        id: category.product_category_id,
        name: category.product_category_name,
    }));

    const handleGetPromotionRuleInfo = async () => {
        try {
            const promotionRuleTypeList = await getAllPromotionRuleType(
                watch("info.range_apply"),
            );

            setRuleTypeList(
                Array.isArray(promotionRuleTypeList)
                    ? promotionRuleTypeList
                    : [],
            );

            if (watch("info.range_apply") === "product") {
                const productMinimalList = await getProductMinimal();
                const categories = await getCategories();

                setProductList(productMinimalList);
                setCategories(categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const mainRule = ruleTypeList.find(
            (r) => r.rule_type_id.toString() === mainRuleSelected,
        );

        setCompatibleRuleType(mainRule?.compatible_rules || []);
    }, [mainRuleSelected]);

    useEffect(() => {
        if (rangeApply) {
            handleGetPromotionRuleInfo();
        }
    }, [rangeApply]);

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold">Add Discount</h2>

            {fields.map((field, index) => (
                <div key={field.id}>
                    <DiscountRuleItem
                        index={index}
                        remove={remove}
                        mainRuleType={formatDataMainRuleType}
                        compatibleRules={formatDataCompatibleRuleType}
                        productMinimalList={formatDataProductMinimal}
                        categories={formatDataCategories}
                    />
                </div>
            ))}

            {errors.rules && (
                <p className="mt-2 text-red-500">{errors.rules.message}</p>
            )}

            <button
                type="button"
                onClick={() =>
                    append({
                        rule_type_name: "",
                        rule_operator: "",
                        rule_value: "",
                    })
                }
                className="bg-main-primary mt-4 rounded px-4 py-2 text-white"
            >
                + Add Rule
            </button>
        </div>
    );
}

export default DiscountRuleList;
