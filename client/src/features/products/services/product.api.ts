import axios from "@/utils/axiosInstance";
import type {
    GetProductByConditionParams,
    ItemStock,
    Product,
    SortOptions,
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

export const getProductSort = async (sortOptions: SortOptions) => {
    const params: Record<string, string> = {
        sortOptions,
    };

    const res = await axios.get<Product[]>("product/bestSeller", params);

    return res.data;
};

export const getProductStock = async (
    product_id: number,
): Promise<ItemStock> => {
    const res = await axios.get<ItemStock>(`product/stock/${product_id}`);

    return res.data;
};
