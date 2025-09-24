import * as yup from "yup";

export const editProductSchema = yup.object().shape({
    name: yup
        .string()
        .required("Product name is required")
        .min(2, "Product name must be at least 2 characters"),

    description: yup
        .string()
        .max(1000, "Description cannot exceed 1000 characters"),

    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be greater than 0"),

    categoryID: yup.string().required("Category is required"),
    productTypeID: yup.string().required("Product type is required"),
    productStatusID: yup.string().required("Status is required"),
    supplierID: yup.string().required("Supplier is required"),

    mainImage: yup
        .mixed<File>()
        .test("fileType", "Invalid file type", (value) => {
            if (!value) return true; // cho phép null
            return value instanceof File;
        }),

    subImages: yup
        .array()
        .of(
            yup.mixed<File>().test("fileType", "Invalid file type", (value) => {
                if (!value) return true;
                return value instanceof File;
            }),
        )
        .max(4, "You can upload up to 4 sub images"),
});

export type EditProductFormInputs = yup.InferType<typeof editProductSchema>;
