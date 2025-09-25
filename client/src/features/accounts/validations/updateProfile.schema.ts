import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
    first_name: yup
        .string()
        .min(2, "Họ phải có ít nhất 2 ký tự")
        .required("Họ là bắt buộc"),
    last_name: yup
        .string()
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .required("Tên là bắt buộc"),
    phone_number: yup
        .string()
        .matches(/^[0-9]{9,12}$/, "Số điện thoại phải gồm 9-12 chữ số")
        .required("Số điện thoại là bắt buộc"),
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
});

export type UpdateProfileFormInputs = yup.InferType<typeof updateProfileSchema>;
