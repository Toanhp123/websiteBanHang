import * as yup from "yup";

export const addWarehouseSchema = yup.object({
    warehouseName: yup.string().required("Warehouse name is required"),
    location: yup.string().required("Location is required"),
    priority: yup.string().required("Priority is required"),
    employeeID: yup.string().required("Employee is required"),
});

export type AddWarehouseFormInputs = yup.InferType<typeof addWarehouseSchema>;
