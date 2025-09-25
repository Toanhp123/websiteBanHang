import * as yup from "yup";

export const warehouseImportSchema = yup.object().shape({
    warehouse_id: yup.string().required("Vui lòng chọn kho"),
    supplier_id: yup.string().required("Vui lòng chọn nhà cung cấp"),
    products: yup
        .array()
        .of(
            yup.object({
                product_id: yup.string().required("Vui lòng chọn sản phẩm"),
                quantity: yup
                    .number()
                    .typeError("Số lượng phải là một số")
                    .integer("Số lượng phải là số nguyên")
                    .required("Vui lòng nhập số lượng")
                    .positive("Số lượng phải lớn hơn 0"),
            }),
        )
        .required("Vui lòng nhập ít nhất một sản phẩm")
        .min(1, "Cần nhập ít nhất một sản phẩm"),
});

export type WarehouseImportFormInputs = yup.InferType<
    typeof warehouseImportSchema
>;
