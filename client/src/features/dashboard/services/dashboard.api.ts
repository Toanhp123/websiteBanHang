import axios from "@/utils/axiosInstance";
import type { Overview, SaleStatistics } from "../types/dashboard.type";

export const getOverview = async (): Promise<Overview> => {
    const res = await axios.get<Overview>("dashboard/overview");

    return res.data;
};

export const getSaleStatistics = async (): Promise<SaleStatistics> => {
    const res = await axios.get("dashboard/saleStatistics");

    return res.data;
};
