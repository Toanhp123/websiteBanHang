import { getProductByCondition } from "@/features/products/services/product.api";
import { normalizeFilter } from "@/utils/normalizeObject";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { selectFilter } from "@/features/filters/redux/filter.slice";
import type { Product } from "@/features/products/types/product.type";

export const useProduct = () => {
    const productFilter = useAppSelector(selectFilter);
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const handleGetProduct = async () => {
        setProduct(
            await getProductByCondition({
                filterOption: normalizeFilter(productFilter),
            }),
        );

        setLoading(false);
    };

    useEffect(() => {
        handleGetProduct();
    }, [productFilter]);

    return { product, loading };
};
