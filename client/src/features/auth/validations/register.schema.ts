import * as yup from "yup";

// Tab 1: tên đăng nhập + email
export const tab1Schema = yup.object().shape({
    username: yup
        .string()
        .required("Tên đăng nhập là bắt buộc")
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự"),
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Địa chỉ email không hợp lệ"),
});

// Tab 2: họ, tên, số điện thoại, ngày sinh
export const tab2Schema = yup.object().shape({
    firstName: yup.string().required("Họ là bắt buộc"),
    lastName: yup.string().required("Tên là bắt buộc"),
    phone: yup
        .string()
        .matches(/^[0-9]{9,11}$/, "Số điện thoại phải từ 9 – 11 chữ số")
        .required("Số điện thoại là bắt buộc"),
    birthday: yup
        .date()
        .max(new Date(), "Ngày sinh không thể ở tương lai")
        .required("Ngày sinh là bắt buộc"),
});

// Tab 3: mật khẩu + xác nhận mật khẩu
export const tab3Schema = yup.object().shape({
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    retypePass: yup
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
});

export type Tab1SchemaFormInputs = yup.InferType<typeof tab1Schema>;
export type Tab2SchemaFormInputs = yup.InferType<typeof tab2Schema>;
export type Tab3SchemaFormInputs = yup.InferType<typeof tab3Schema>;

export type RegisterFormInputs = Tab1SchemaFormInputs &
    Tab2SchemaFormInputs &
    Tab3SchemaFormInputs;
