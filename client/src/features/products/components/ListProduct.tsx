import { useEffect, useState } from "react";
import ItemProduct from "./ItemProduct";
import { Pagination } from "@/components/shared";
import { ITEMS_PER_PAGE } from "@/constants/mics";
import { getProductByCondition } from "../services/product.api";
import type { Product } from "../types/product.type";
import { useAppSelector } from "@/hooks/useRedux";
import { selectFilter } from "@/features/filters/redux/filter.slice";
import { normalizeFilter } from "@/utils/normalizeObject";
import Loading from "@/features/loading/components/Loading";

function ListProduct() {
    const [page, setPage] = useState<number>(1);
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const productFilter = useAppSelector(selectFilter);

    const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
    const endIndex: number = startIndex + ITEMS_PER_PAGE;
    const visibleItems = product.slice(startIndex, endIndex);

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
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    if (loading) return <Loading />;

    return (
        <div className="space-y-12">
            <ul className="grid grid-cols-3 gap-6">
                {visibleItems.map((item) => (
                    <li key={item.product_id}>
                        <ItemProduct
                            product_id={item.product_id}
                            totalStock={item.totalStock}
                            product_name={item.product_name}
                            images={item.images}
                            price={item.price}
                            category={item.category}
                        />
                    </li>
                ))}
            </ul>

            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={Math.ceil(product.length / ITEMS_PER_PAGE)}
            />
        </div>
    );
}

export default ListProduct;
