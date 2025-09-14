import * as yup from "yup";

export const discountSchema = yup.object().shape({
    info: yup.object().shape({
        promotion_name: yup.string().required("Discount name is required"),
        distribution_type: yup
            .string()
            .required("Discount distribution is required"),
        range_apply: yup.string().required("Discount range apply is required"),
        valid_from: yup
            .date()
            .transform((_, originalValue) => {
                if (originalValue === "" || originalValue == null)
                    return undefined;
                return new Date(originalValue);
            })
            .required("Discount valid from is required"),
        valid_to: yup
            .date()
            .transform((_, originalValue) => {
                if (originalValue === "" || originalValue == null)
                    return undefined;
                return new Date(originalValue);
            })
            .required("Discount valid to is required")
            .min(
                yup.ref("valid_from"),
                "Discount valid to must be greater than or equal to Valid From",
            ),
    }),
    rules: yup
        .array()
        .of(
            yup.object().shape({
                rule_type_id: yup.string().required("Rule type is required"),
                rule_operator: yup.string().required("Operator is required"),
                rule_value: yup.string().nullable(),
                product_category_id: yup.string().nullable(),
                product_id: yup.string().nullable(),
            }),
        )
        .min(1, "At least one rule is required")
        .required("Discount rule is required"),
    effect: yup.object().shape({
        effect_type_id: yup.string().required("Effect type is required"),
        effect_value: yup.string().nullable(),
        product_id: yup.string().nullable(),
    }),
});

export type AddDiscountFormInputs = yup.InferType<typeof discountSchema>;
