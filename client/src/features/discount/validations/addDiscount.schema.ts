import * as yup from "yup";

export const discountSchema = yup.object().shape({
    info: yup.object().shape({
        promotion_name: yup.string().required("Tên khuyến mãi là bắt buộc"),
        distribution_type: yup
            .string()
            .required("Hình thức phân phối khuyến mãi là bắt buộc"),
        range_apply: yup
            .string()
            .required("Phạm vi áp dụng khuyến mãi là bắt buộc"),
        valid_from: yup
            .date()
            .transform((_, originalValue) => {
                if (originalValue === "" || originalValue == null)
                    return undefined;
                return new Date(originalValue);
            })
            .required("Ngày bắt đầu khuyến mãi là bắt buộc"),
        valid_to: yup
            .date()
            .transform((_, originalValue) => {
                if (originalValue === "" || originalValue == null)
                    return undefined;
                return new Date(originalValue);
            })
            .required("Ngày kết thúc khuyến mãi là bắt buộc")
            .min(
                yup.ref("valid_from"),
                "Ngày kết thúc khuyến mãi phải lớn hơn hoặc bằng ngày bắt đầu",
            ),
    }),
    rules: yup
        .array()
        .of(
            yup.object().shape({
                rule_type_id: yup.string().required("Loại luật là bắt buộc"),
                rule_operator: yup.string().required("Toán tử là bắt buộc"),
                rule_value: yup.string().nullable(),
                product_category_id: yup.string().nullable(),
                product_id: yup.string().nullable(),
                rule_type_description: yup.string().optional(),
                rule_value_template: yup.string().optional(),
            }),
        )
        .min(1, "Ít nhất phải có một luật")
        .required("Luật khuyến mãi là bắt buộc"),
    effect: yup.object().shape({
        effect_type_id: yup.string().required("Loại hiệu lực là bắt buộc"),
        effect_type_description: yup.string().optional(),
        effect_value: yup.string().nullable(),
        product_id: yup.string().nullable(),
    }),
});

export type AddDiscountFormInputs = yup.InferType<typeof discountSchema>;
