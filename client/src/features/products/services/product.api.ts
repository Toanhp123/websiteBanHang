import axios from "@/utils/axiosInstance";
import type {
    GetProductByConditionParams,
    ItemStock,
    Product,
    ProductAdvancedInfo,
    ProductDetail,
    ProductMinimal,
    ProductType,
    Supplier,
    Warehouse,
} from "../types/product.type";

export const getProductByCondition = async ({
    filterOption,
    option,
    search,
    page,
    itemsPerPage,
}: GetProductByConditionParams): Promise<{
    data: Product[];
    total: number;
}> => {
    const params: Record<string, string | number | boolean | null> = {};

    if (filterOption?.category) params.category = filterOption.category;
    if (filterOption?.product_type)
        params.productType = filterOption.product_type;
    if (filterOption?.available) params.availability = filterOption.available;

    if (option) params.sortBy = option;

    if (search) params.search = search;

    params.page = page;
    params.itemsPerPage = itemsPerPage;

    const res = await axios.get("product", {
        params,
    });

    return res.data;
};

export const getDetailProduct = async (product_id: number) => {
    const res = await axios.get<ProductDetail>(`product/${product_id}`);

    return res.data;
};

export const getProductStock = async (
    product_id: number,
): Promise<ItemStock> => {
    const res = await axios.get<ItemStock>(`product/stock/${product_id}`);

    return res.data;
};

export const getWarehouse = async (): Promise<Warehouse[]> => {
    const res = await axios.get(`product/warehouse`);

    return res.data;
};

export const getSupplier = async (): Promise<Supplier[]> => {
    const res = await axios.get(`product/supplier`);

    return res.data;
};

export const addProduct = async (
    formData: FormData,
): Promise<{ success: boolean; message: string }> => {
    const res = await axios.post(`product/addProduct`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const getProductType = async (): Promise<ProductType[]> => {
    const res = await axios.get(`product/type`);

    return res.data;
};

export const deleteProduct = async (product_id: number) => {
    await axios.delete(`product/${product_id}`);
};

export const getProductAdvancedInfo =
    async (): Promise<ProductAdvancedInfo> => {
        const res = await axios.get(`product/advancedInfo`);

        return res.data;
    };

export const updateProduct = async (
    formData: FormData,
    product_id: number,
): Promise<{
    success: boolean;
    message: string;
}> => {
    const res = await axios.put(
        `product/updateProduct/${product_id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return res.data;
};

export const addSupplier = async ({ ...data }): Promise<Supplier> => {
    const res = await axios.post(`product/addSupplier`, { data });

    return res.data;
};

export const getProductMinimal = async (): Promise<ProductMinimal[]> => {
    const res = await axios.get(`product/minimal`);

    return res.data;
};
