import * as yup from "yup";

export const editProductSchema = yup.object().shape({
    product_name: yup
        .string()
        .required("Tên sản phẩm là bắt buộc")
        .min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),

    product_description: yup
        .string()
        .required("Mô tả sản phẩm là bắt buộc")
        .max(1000, "Mô tả không được vượt quá 1000 ký tự"),

    price: yup
        .number()
        .typeError("Giá phải là số")
        .required("Giá là bắt buộc")
        .positive("Giá phải lớn hơn 0"),

    product_category_id: yup.string().required("Danh mục là bắt buộc"),
    product_type_id: yup.string().required("Loại sản phẩm là bắt buộc"),
    product_status_id: yup.string().required("Trạng thái là bắt buộc"),
    supplier_id: yup.string().required("Nhà cung cấp là bắt buộc"),

    mainImage: yup
        .mixed<FileList>()
        .nullable()
        .notRequired()
        .test("fileType", "Loại tệp không hợp lệ", (value) => {
            if (!value || value.length === 0) return true;
            return Array.from(value).every((file) => file instanceof File);
        })
        .test("fileFormat", "Chỉ cho phép tệp hình ảnh", (value) => {
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
                .test("fileType", "Loại tệp không hợp lệ", (value) => {
                    if (!value) return true; // cho phép bỏ trống
                    return value instanceof File;
                }),
        )
        .nullable()
        .notRequired(),
});

export type EditProductFormInputs = yup.InferType<typeof editProductSchema>;
