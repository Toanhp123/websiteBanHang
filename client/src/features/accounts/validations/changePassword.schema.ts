import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
    pass: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Current password is required"),
    newPass: yup
        .string()
        .min(6, "New password must be at least 6 characters")
        .required("New password is required"),
    reNewPass: yup
        .string()
        .oneOf([yup.ref("newPass")], "Passwords do not match")
        .required("Please confirm your new password"),
});

export type ChangePasswordFormInputs = yup.InferType<
    typeof changePasswordSchema
>;
