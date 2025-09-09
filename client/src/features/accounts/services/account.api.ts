import axios from "@/utils/axiosInstance";
import type {
    Employee,
    EmployeeDetail,
    PositionEmployee,
} from "../types/accounts.type";

export const changePassword = async ({ ...changePassword }): Promise<void> => {
    await axios.put("account/password", { changePassword });
};

export const getAllEmployee = async (): Promise<Employee[]> => {
    const res = await axios.get("/account/employee");

    return res.data;
};

export const getDetailEmployee = async (
    employee_id: number,
): Promise<EmployeeDetail> => {
    const res = await axios.get(`/account/employee/${employee_id}`);

    return res.data;
};

export const getAllPositionEmployee = async (): Promise<PositionEmployee[]> => {
    const res = await axios.get(`/account/employee/position`);

    return res.data;
};

export const updateEmployee = async (
    employee_id: number,
    changes: Record<string, unknown>,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.patch(`/account/employee/${employee_id}`, {
        changes,
    });

    return res.data;
};

export const deleteEmployee = async (employee_id: number) => {
    const res = await axios.delete(`/account/employee/${employee_id}`);

    return res.data;
};

export const addEmployee = async (
    data: Record<string, unknown>,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.post(`/account/employee`, {
        data,
    });

    return res.data;
};
