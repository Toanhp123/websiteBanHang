export type PriceState = {
    discount: number;
    final_total: number;
};

export type BillDetailState = {
    first_name: string;
    last_name: string;
    email: string;
    street_address: string;
    city: string;
    country: string;
    zip_code: string;
    phone: string;
    payment_method: string;
};

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
