import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
    pass: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu hiện tại là bắt buộc"),
    newPass: yup
        .string()
        .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
        .required("Mật khẩu mới là bắt buộc"),
    reNewPass: yup
        .string()
        .oneOf([yup.ref("newPass")], "Mật khẩu nhập lại không khớp")
        .required("Vui lòng xác nhận mật khẩu mới"),
});

export type ChangePasswordFormInputs = yup.InferType<
    typeof changePasswordSchema
>;
