import axios from "@/utils/axiosInstance";

export const getOverview = async () => {
    const res = await axios.get("dashboard/overview");

    return res.data;
};
