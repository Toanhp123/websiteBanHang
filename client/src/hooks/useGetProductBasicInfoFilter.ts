import { getProductAdvancedInfo } from "@/features/products/services/product.api";
import type { ProductAdvancedInfo } from "@/features/products/types/product.type";
import { useEffect, useState } from "react";

export const useGetProductAdvancedInfo = () => {
    const [product, setProduct] = useState<ProductAdvancedInfo | null>(null);

    const handleGetAllWarehouse = async () => {
        try {
            const res = await getProductAdvancedInfo();

            if (res) {
                setProduct(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllWarehouse();
    }, []);

    return product;
};
