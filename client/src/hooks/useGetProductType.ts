import { getProductType } from "@/features/products/services/product.api";
import type { ProductType } from "@/features/products/types/product.type";
import { useEffect, useState } from "react";

export const useGetProductType = () => {
    const [productType, setProductType] = useState<ProductType[]>([]);

    const handleGetProductType = async () => {
        try {
            const res = await getProductType();

            setProductType(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetProductType();
    }, []);

    return productType;
};
