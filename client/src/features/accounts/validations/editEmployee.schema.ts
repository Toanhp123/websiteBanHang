import * as yup from "yup";

export const editEmployeeSchema = yup.object().shape({
    employee_first_name: yup.string().required("First name is required"),
    employee_last_name: yup.string().required("Last name is required"),
    employee_phone: yup
        .string()
        .matches(/^[0-9]{10,11}$/, "Invalid phone number")
        .required("Phone is required"),
    employee_birthday: yup.string().required("Birthday is required"),
    employee_address: yup.string().required("Location is required"),
    username: yup.string().min(6).required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    employee_position_id: yup.string().required("Position is required"),
    password: yup
        .string()
        .nullable()
        .transform((val, origVal) => (origVal === "" ? null : val))
        .min(6, "Password must be at least 6 characters")
        .notRequired(),
});

export type EditEmployeeFormInputs = yup.InferType<typeof editEmployeeSchema>;
