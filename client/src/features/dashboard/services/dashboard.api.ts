import axios from "@/utils/axiosInstance";
import type { Overview } from "../types/dashboard.type";

export const getOverview = async (): Promise<Overview> => {
    const res = await axios.get<Overview>("dashboard/overview");

    return res.data;
};
