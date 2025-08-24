import axios from "@/utils/axiosInstance";
import type { Categories } from "../types/categories.type";

export const getCategories = async (): Promise<Categories[]> => {
    const res = await axios.get<Categories[]>("product/categories");

    return res.data;
};
