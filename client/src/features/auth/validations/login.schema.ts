import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .required("Tên đăng nhập là bắt buộc")
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormInputs = yup.InferType<typeof loginSchema>;
