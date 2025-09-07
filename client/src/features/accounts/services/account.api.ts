import axios from "@/utils/axiosInstance";
import type { Employee } from "../types/accounts.type";

export const changePassword = async ({ ...changePassword }): Promise<void> => {
    await axios.put("account/password", { changePassword });
};

export const getAllEmployee = async (): Promise<Employee[]> => {
    const res = await axios.get("/account/employee");

    return res.data;
};
