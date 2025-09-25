import * as yup from "yup";

export const addEmployeeSchema = yup.object().shape({
    employeeFirstName: yup.string().required("Họ là bắt buộc"),
    employeeLastName: yup.string().required("Tên là bắt buộc"),
    employeePhone: yup
        .string()
        .matches(/^[0-9]{9,11}$/, "Số điện thoại phải từ 9 – 11 chữ số")
        .required("Số điện thoại là bắt buộc"),
    employeeBirthDay: yup.string().required("Ngày sinh là bắt buộc"),
    employeeLocation: yup.string().required("Địa chỉ là bắt buộc"),
    employeeEmail: yup
        .string()
        .email("Định dạng email không hợp lệ")
        .required("Email là bắt buộc"),
    accountUsername: yup
        .string()
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
        .required("Tên đăng nhập là bắt buộc"),
    accountPassword: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu là bắt buộc"),
    accountPositionID: yup.string().required("Chức vụ là bắt buộc"),
});

export type AddEmployeeFormInputs = yup.InferType<typeof addEmployeeSchema>;
