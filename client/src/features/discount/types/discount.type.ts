export type PromotionIsValid = true | false | "nothing";

export interface PromotionDetail {
    promotion_id: number | null;
    promotion_name: string;
    valid_from: string;
    valid_to: string;
    distribution_type: "share" | "exclusive";
    range_apply: "invoice" | "product";

    // Effect
    effect_type_name: string;
    effect_product_id: number | null;
    effect_value: string;

    // Rule
    rule_type_name: string;
    rule_operator: ">=" | "<=" | "==" | ">" | "<";
    rule_value: string;
    rule_product_id: number | null;
}

export type DiscountRuleItemProps = {
    index: number;
    remove: (index: number) => void;
    mainRuleType: {
        id: number;
        name: string;
    }[];
    compatibleRules: {
        id: number;
        name: string;
    }[];
    productMinimalList: {
        id: number;
        name: string;
    }[];
    categories: {
        id: number;
        name: string;
    }[];
};

export type DiscountRuleType = {
    rule_type_id: number;
    rule_type_name: string;
    rule_type_description: string;
    compatible_rules: CompatibleRuleType[];
};

export type CompatibleRuleType = Omit<DiscountRuleType, "compatible_rules">;

export type DiscountEffectType = {
    effect_type_id: number;
    effect_type_name: string;
    effect_type_description: string;
};
