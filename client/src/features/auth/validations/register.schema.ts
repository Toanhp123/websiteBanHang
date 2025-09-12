import * as yup from "yup";

// Tab 1: username + email
export const tab1Schema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
});

// Tab 2: firstName, lastName, phone, birthday
export const tab2Schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{9,11}$/, "Phone number must be 9 – 11 digits")
        .required("Phone number is required"),
    birthday: yup
        .date()
        .max(new Date(), "Birthday cannot be in the future")
        .required("Birthday is required"),
});

// Tab 3: password + retypePass
export const tab3Schema = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    retypePass: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please retype your password"),
});

export type Tab1SchemaFormInputs = yup.InferType<typeof tab1Schema>;
export type Tab2SchemaFormInputs = yup.InferType<typeof tab2Schema>;
export type Tab3SchemaFormInputs = yup.InferType<typeof tab3Schema>;

export type RegisterFormInputs = Tab1SchemaFormInputs &
    Tab2SchemaFormInputs &
    Tab3SchemaFormInputs;
