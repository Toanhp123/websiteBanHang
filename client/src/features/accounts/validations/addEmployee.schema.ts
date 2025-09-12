import * as yup from "yup";

export const addEmployeeSchema = yup.object().shape({
    employeeFirstName: yup.string().required("First name is required"),
    employeeLastName: yup.string().required("Last name is required"),
    employeePhone: yup
        .string()
        .matches(/^[0-9]{9,11}$/, "Phone number must be 9 – 11 digits")
        .required("Phone number is required"),
    employeeBirthDay: yup.string().required("Birthday is required"),
    employeeLocation: yup.string().required("Location is required"),
    employeeEmail: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    accountUsername: yup
        .string()
        .min(6, "Username must be at least 6 characters")
        .required("Username is required"),
    accountPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    accountPositionID: yup.string().required("Position is required"),
});

export type AddEmployeeFormInputs = yup.InferType<typeof addEmployeeSchema>;
