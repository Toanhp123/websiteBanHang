import * as yup from "yup";

export const addProductSchema = yup.object({
    price: yup.string().required("Giá sản phẩm là bắt buộc"),
    supplierID: yup.string().required("Nhà cung cấp là bắt buộc"),
    categoryID: yup.string().required("Danh mục là bắt buộc"),
    productCode: yup.string().required("Mã sản phẩm là bắt buộc"),
    productTitle: yup.string().required("Tên sản phẩm là bắt buộc"),
    productDescription: yup.string().required("Mô tả sản phẩm là bắt buộc"),
    productTypeID: yup.string().required("Loại sản phẩm là bắt buộc"),
    mainImage: yup
        .mixed<FileList>()
        .required("Ảnh chính là bắt buộc")
        .test("fileType", "Chỉ cho phép tệp hình ảnh", (value) => {
            const fileList = value as FileList | undefined;
            return (
                fileList &&
                fileList.length > 0 &&
                fileList[0].type.startsWith("image/")
            );
        }),
});

export type AddProductFormInputs = yup.InferType<typeof addProductSchema>;
