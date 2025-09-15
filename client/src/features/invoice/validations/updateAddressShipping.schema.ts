import * as yup from "yup";

export const updateAddressShipping = yup.object().shape({
    first_name: yup
        .string()
        .required("Họ là bắt buộc")
        .max(50, "Họ không được quá 50 ký tự"),
    last_name: yup
        .string()
        .required("Tên là bắt buộc")
        .max(50, "Tên không được quá 50 ký tự"),
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
    street_address: yup
        .string()
        .required("Địa chỉ đường là bắt buộc")
        .max(255, "Địa chỉ đường không được quá 255 ký tự"),
    city: yup.string().required("Thành phố là bắt buộc"),
    country: yup.string().required("Quốc gia là bắt buộc"),
    zip_code: yup
        .string()
        .matches(/^\d{4,10}$/, "Mã bưu điện không hợp lệ")
        .required("Mã bưu điện là bắt buộc"),
    phone: yup
        .string()
        .matches(/^[0-9]{9,15}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
});

export type UpdateAddressShippingFormInputs = yup.InferType<
    typeof updateAddressShipping
>;
