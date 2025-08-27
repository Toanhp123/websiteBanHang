import axios from "@/utils/axiosInstance";
import type {
    GetProductByConditionParams,
    ItemStock,
    Product,
} from "../types/product.type";

export const getProductByCondition = async ({
    filterOption,
    option,
}: GetProductByConditionParams): Promise<Product[]> => {
    const params: Record<string, string | number | boolean | null> = {};

    if (filterOption?.category) params.category = filterOption.category;
    if (filterOption?.product_type)
        params.productType = filterOption.product_type;
    if (filterOption?.available) params.availability = filterOption.available;
    if (option) params.sortBy = option;

    const res = await axios.get<Product[]>("product", {
        params,
    });

    return res.data;
};

export const getDetailProduct = async (product_id: number) => {
    const res = await axios.get<Product>(`product/${product_id}`);

    return res.data;
};

export const getProductStock = async (
    product_id: number,
): Promise<ItemStock> => {
    const res = await axios.get<ItemStock>(`product/stock/${product_id}`);

    return res.data;
};
