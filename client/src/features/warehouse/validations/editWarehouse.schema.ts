import * as yup from "yup";

export const editWarehouseSchema = yup.object({
    warehouse_name: yup.string().required("Warehouse name is required"),
    location: yup.string().required("Location is required"),
    priority: yup.string().required("Priority is required"),
    employee_id: yup.string().required("Employee is required"),
});

export type EditWarehouseFormInputs = yup.InferType<typeof editWarehouseSchema>;
