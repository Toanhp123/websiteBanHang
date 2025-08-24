import axios from "@/utils/axiosInstance";
import type { ItemStock, Product } from "../types/product.type";

export const getProductByCondition = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>("product");

    return res.data;
};

export const getProductStock = async (
    product_id: number,
): Promise<ItemStock> => {
    const res = await axios.get<ItemStock>(`product/stock/${product_id}`);

    return res.data;
};
