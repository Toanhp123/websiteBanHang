export type PromotionIsValid = true | false | "nothing";

export interface PromotionInfo {
    promotion_id: number;
    promotion_name: string;
    valid_from: string;
    valid_to: string;
    distribution_type: "share" | "exclusive";
    range_apply: "invoice" | "product";
    promotion_status: "active" | "expired" | "deleted";
    created_at: string;
}

export interface PromotionDetail extends PromotionInfo {
    effects: PromotionEffectDetail;
    rules: PromotionRuleDetail[];
}

export interface PromotionEffectDetail {
    effect_id: number;
    effect_value: string;
    product_id: number | null;
    effect_type?: string;
    effect_description?: string;
    effect_type_id: number;
}

export interface PromotionRuleDetail {
    rule_id: number;
    rule_value: string;
    rule_type_id: number;
    rule_operator: string;
    product_id: number | null;
    product_category_id: number | null;
    rule_type?: string;
    rule_description?: string;
    template?: string;
}

export type DiscountRuleItemProps = {
    index: number;
    remove: (index: number) => void;
    mainRuleType: {
        id: number;
        name: string;
        optionData: string;
    }[];
    compatibleRules: {
        id: number;
        name: string;
        optionData: string;
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
    rule_value_template: string;
    compatible_rules: CompatibleRuleType[];
};

export type CompatibleRuleType = Omit<DiscountRuleType, "compatible_rules">;

export type DiscountEffectType = {
    effect_type_id: number;
    effect_type_name: string;
    effect_type_description: string;
    rule_value_template: string;
};

export type PromotionEffect = {
    effect_type_id: number;
    effect_value: string | number;
    product_id: number | null;
};

export type PromotionProduct = {
    product_id: number;
};

export type PromotionCategory = {
    product_category_id: number | null;
};

export type PromotionForProduct = {
    promotion_id: number;
    promotion_name: string;
    promotion_status: string;
    range_apply: "product" | "category";
    distribution_type: string;
    valid_from: string;
    valid_to: string;
    PromotionProducts?: PromotionProduct;
    PromotionCategory?: PromotionCategory;
    PromotionEffects: PromotionEffect;
};
