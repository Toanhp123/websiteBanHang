import * as yup from "yup";

export const warehouseImportSchema = yup.object().shape({
    warehouse_id: yup.string().required("Warehouse is required"),
    supplier_id: yup.string().required("Supplier is required"),
    products: yup
        .array()
        .of(
            yup.object({
                product_id: yup.string().required("Product is required"),
                quantity: yup
                    .number()
                    .integer("Quantity must be an integer")
                    .required("Quantity is required")
                    .positive("Quantity must be greater than 0"),
            }),
        )
        .required()
        .min(1, "At least one product is required"),
});

export type WarehouseImportFormInputs = yup.InferType<
    typeof warehouseImportSchema
>;
