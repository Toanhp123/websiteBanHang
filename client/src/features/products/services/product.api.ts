import axios from "@/utils/axiosInstance";
import type { ItemStock, Product } from "../types/product.type";
import type { FilterState } from "@/features/filters/types/filter.type";

export const getProductByCondition = async (
    filterOption: FilterState,
): Promise<Product[]> => {
    const params: Record<string, string | number | boolean | null> = {
        category: filterOption.category || null,
        productType: filterOption.product_type || null,
        availability: filterOption.available || null,
    };

    const res = await axios.get<Product[]>("product", {
        params,
    });

    return res.data;
};

export const getLatestProduct = async () => {
    const res = await axios.get<Product[]>("product/latest");

    return res.data;
};

export const getBestSellerProduct = async () => {
    const res = await axios.get<Product[]>("product/bestSeller");

    return res.data;
};

export const getProductStock = async (
    product_id: number,
): Promise<ItemStock> => {
    const res = await axios.get<ItemStock>(`product/stock/${product_id}`);

    return res.data;
};
