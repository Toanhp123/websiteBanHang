import * as yup from "yup";

export const addProductSchema = yup.object({
    price: yup.string().required("Price is required"),
    supplierID: yup.string().required("Supplier is required"),
    categoryID: yup.string().required("Category is required"),
    productCode: yup.string().required("Product code is required"),
    productTitle: yup.string().required("Product title is required"),
    productDescription: yup
        .string()
        .required("Product description is required"),
    productTypeID: yup.string().required("Product type is required"),
    mainImage: yup
        .mixed<FileList>()
        .required("Main image is required")
        .test("fileType", "Only image files are allowed", (value) => {
            const fileList = value as FileList | undefined;
            return (
                fileList &&
                fileList.length > 0 &&
                fileList[0].type.startsWith("image/")
            );
        }),
});

export type AddProductFormInputs = yup.InferType<typeof addProductSchema>;
