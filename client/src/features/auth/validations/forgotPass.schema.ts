import * as yup from "yup";

// Tab 1: nhập email
export const forgotPassEmailSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});

// Tab 3: reset password
export const forgotPassResetSchema = yup.object({
    pass: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    rePass: yup
        .string()
        .oneOf([yup.ref("pass")], "Passwords do not match")
        .required("Re password is required"),
});

export type ForgotPassResetFormInputs = yup.InferType<
    typeof forgotPassResetSchema
>;

export type ForgotPassEmailFormInputs = yup.InferType<
    typeof forgotPassEmailSchema
>;
