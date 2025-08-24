import axios from "@/utils/axiosInstance";
import type { ItemType } from "../types/filter.type";

export const getItemType = async (): Promise<ItemType[]> => {
    const res = await axios.get<ItemType[]>("product/type");

    return res.data;
};
