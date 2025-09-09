import { getProductByCondition } from "@/features/products/services/product.api";
import { normalizeFilter } from "@/utils/normalizeObject";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { selectFilter } from "@/features/filters/redux/filter.slice";
import type { Product } from "@/features/products/types/product.type";
import { selectOptionSortProduct } from "@/features/filters/redux/optionSortProduct.slice";

export const useProduct = (search: string = "") => {
    const productFilter = useAppSelector(selectFilter);
    const optionSelected = useAppSelector(selectOptionSortProduct);
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleGetProduct = async () => {
            setProduct(
                await getProductByCondition({
                    filterOption: normalizeFilter(productFilter),
                    option: optionSelected,
                    search: search,
                }),
            );

            setLoading(false);
        };

        handleGetProduct();
    }, [productFilter, optionSelected, search]);

    return { product, loading };
};
