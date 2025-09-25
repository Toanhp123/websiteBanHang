import * as yup from "yup";

export const editWarehouseSchema = yup.object({
    warehouse_name: yup.string().required("Tên kho là bắt buộc"),
    location: yup.string().required("Địa điểm là bắt buộc"),
    priority: yup.string().required("Độ ưu tiên là bắt buộc"),
    employee_id: yup.string().required("Nhân viên phụ trách là bắt buộc"),
});

export type EditWarehouseFormInputs = yup.InferType<typeof editWarehouseSchema>;
