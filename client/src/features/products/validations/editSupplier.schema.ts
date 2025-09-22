import * as yup from "yup";

export const editSupplierSchema = yup.object({
    supplier_name: yup.string().required("Supplier name is required"),
});

export type EditSupplierFormInputs = yup.InferType<typeof editSupplierSchema>;
