import * as yup from "yup";

export const editSupplierSchema = yup.object({
    supplier_name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
});

export type EditSupplierFormInputs = yup.InferType<typeof editSupplierSchema>;
