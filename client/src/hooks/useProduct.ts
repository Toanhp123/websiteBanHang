import { getProductByCondition } from "@/features/products/services/product.api";
import { normalizeFilter } from "@/utils/normalizeObject";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { selectFilter } from "@/features/filters/redux/filter.slice";
import type { Product } from "@/features/products/types/product.type";
import { selectOptionSortProduct } from "@/features/filters/redux/optionSortProduct.slice";
import { ITEMS_PER_PAGE } from "@/constants/mics.constants";

type UseProductParams = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
};

export const useProduct = ({
    search = "",
    page = 1,
    itemsPerPage = ITEMS_PER_PAGE,
}: UseProductParams) => {
    const productFilter = useAppSelector(selectFilter);
    const optionSelected = useAppSelector(selectOptionSortProduct);

    const [product, setProduct] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleGetProduct = async () => {
            const res = await getProductByCondition({
                filterOption: normalizeFilter(productFilter),
                option: optionSelected,
                search: search,
                page,
                itemsPerPage,
            });

            setProduct(res.data);
            setTotalItems(res.total);
            setLoading(false);
        };

        handleGetProduct();
    }, [productFilter, optionSelected, search, page, itemsPerPage]);

    return { product, loading, totalItems };
};
