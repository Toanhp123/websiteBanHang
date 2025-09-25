import * as yup from "yup";

export const editProductSchema = yup.object().shape({
    product_name: yup
        .string()
        .required("Product name is required")
        .min(2, "Product name must be at least 2 characters"),

    product_description: yup
        .string()
        .required("Product is required")
        .max(1000, "Description cannot exceed 1000 characters"),

    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be greater than 0"),

    product_category_id: yup.string().required("Category is required"),
    product_type_id: yup.string().required("Product type is required"),
    product_status_id: yup.string().required("Status is required"),
    supplier_id: yup.string().required("Supplier is required"),

    mainImage: yup
        .mixed<FileList>()
        .nullable()
        .notRequired()
        .test("fileType", "Invalid file type", (value) => {
            if (!value || value.length === 0) return true;
            return Array.from(value).every((file) => file instanceof File);
        })
        .test("fileFormat", "Only image files are allowed", (value) => {
            if (!value || value.length === 0) return true;
            return Array.from(value).every((file) =>
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                    file.type,
                ),
            );
        }),

    subImages: yup
        .array()
        .of(
            yup
                .mixed<File>()
                .nullable()
                .notRequired()
                .test("fileType", "Invalid file type", (value) => {
                    if (!value) return true; // cho phép bỏ trống
                    return value instanceof File;
                }),
        )
        .nullable()
        .notRequired(),
});

export type EditProductFormInputs = yup.InferType<typeof editProductSchema>;
