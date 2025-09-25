import axios from "@/utils/axiosInstance";
import type {
    Customer,
    CustomerMinimal,
    Employee,
    EmployeeDetail,
    EmployeeScheduleResponse,
    PositionEmployee,
    Shifts,
} from "../types/accounts.type";

export const changePassword = async ({
    ...changePassword
}): Promise<{ message: string; success: boolean }> => {
    const res = await axios.put("account/password", { changePassword });

    return res.data;
};

export const getAllEmployee = async (
    show_deleted: boolean,
): Promise<Employee[]> => {
    const res = await axios.get("/account/employee", {
        params: { show_deleted },
    });

    return res.data;
};

export const getDetailEmployeeAndAccount = async (
    employee_id: number,
): Promise<EmployeeDetail> => {
    const res = await axios.get(
        `/account/employee/detailAndAccount/${employee_id}`,
    );

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

export const deleteEmployee = async (
    employee_id: number,
): Promise<{ message: string; success: boolean }> => {
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

export const getEmployeeDetail = async (
    employee_id: number,
): Promise<Employee> => {
    const res = await axios.get(`/account/employee/${employee_id}`);

    return res.data;
};

export const getAllCustomer = async (): Promise<Customer[]> => {
    const res = await axios.get(`/account/customer`);

    return res.data;
};

export const updateAccountStatus = async (
    customer_id: number,
    status: string,
) => {
    const res = await axios.patch(`/account/customer/status/${customer_id}`, {
        status,
    });

    return res.data;
};

export const recoverAccount = async (
    employee_id: number,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.patch(`/account/employee/recover/${employee_id}`);

    return res.data;
};

export const getScheduleAllEmployee =
    async (): Promise<EmployeeScheduleResponse> => {
        const res = await axios.get(`/account/employee/schedule`);

        return res.data;
    };

export const getAllShifts = async (): Promise<Shifts[]> => {
    const res = await axios.get(`/account/employee/shifts`);

    return res.data;
};

export const registerSchedule = async (
    schedule: Record<number, number | null>,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.post(`/account/employee/schedule`, { schedule });

    return res.data;
};

export const getProfile = async (): Promise<CustomerMinimal> => {
    const res = await axios.get(`/profile`);

    return res.data;
};

export const changeProfile = async (
    changes: Record<string, unknown>,
): Promise<{ message: string; success: boolean }> => {
    const res = await axios.patch(`/profile/update`, { changes });

    return res.data;
};
