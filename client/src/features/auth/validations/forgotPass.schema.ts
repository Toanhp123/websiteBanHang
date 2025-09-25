import * as yup from "yup";

// Tab 1: nhập email
export const forgotPassEmailSchema = yup.object({
    email: yup
        .string()
        .email("Định dạng email không hợp lệ")
        .required("Email là bắt buộc"),
});

// Tab 3: đặt lại mật khẩu
export const forgotPassResetSchema = yup.object({
    pass: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu là bắt buộc"),
    rePass: yup
        .string()
        .oneOf([yup.ref("pass")], "Mật khẩu nhập lại không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
});

export type ForgotPassResetFormInputs = yup.InferType<
    typeof forgotPassResetSchema
>;

export type ForgotPassEmailFormInputs = yup.InferType<
    typeof forgotPassEmailSchema
>;
