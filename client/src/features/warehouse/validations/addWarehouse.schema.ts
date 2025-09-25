import * as yup from "yup";

export const addWarehouseSchema = yup.object({
    warehouseName: yup.string().required("Tên kho là bắt buộc"),
    location: yup.string().required("Địa điểm là bắt buộc"),
    priority: yup.string().required("Độ ưu tiên là bắt buộc"),
    employeeID: yup.string().required("Nhân viên phụ trách là bắt buộc"),
});

export type AddWarehouseFormInputs = yup.InferType<typeof addWarehouseSchema>;
