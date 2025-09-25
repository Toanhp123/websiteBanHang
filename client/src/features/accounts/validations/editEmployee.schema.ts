import * as yup from "yup";

export const editEmployeeSchema = yup.object().shape({
    employee_first_name: yup.string().required("Họ là bắt buộc"),
    employee_last_name: yup.string().required("Tên là bắt buộc"),
    employee_phone: yup
        .string()
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
    employee_birthday: yup.string().required("Ngày sinh là bắt buộc"),
    employee_address: yup.string().required("Địa chỉ là bắt buộc"),
    username: yup
        .string()
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
        .required("Tên đăng nhập là bắt buộc"),
    email: yup
        .string()
        .email("Địa chỉ email không hợp lệ")
        .required("Email là bắt buộc"),
    employee_position_id: yup.string().required("Chức vụ là bắt buộc"),
    password: yup
        .string()
        .nullable()
        .transform((val, origVal) => (origVal === "" ? null : val))
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .notRequired(),
});

export type EditEmployeeFormInputs = yup.InferType<typeof editEmployeeSchema>;
