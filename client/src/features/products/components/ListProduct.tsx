import { useEffect, useState } from "react";
import ItemProduct from "./ItemProduct";
import { Pagination } from "@/components/shared";
import { ITEMS_PER_PAGE } from "@/constants/mics.constants";
import Loading from "@/features/loading/components/Loading";
import { useProduct } from "@/hooks/useProduct";
import { useSearchParams } from "react-router-dom";

function ListProduct() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const [page, setPage] = useState<number>(1);
    const { product, loading, totalItems } = useProduct({
        search: search,
        page: page,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    if (loading) return <Loading />;

    return (
        <div className="space-y-12">
            <ul className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
                {product.map((item) => (
                    <li key={item.product_id}>
                        <ItemProduct
                            product_id={item.product_id}
                            totalStock={item.totalStock}
                            product_name={item.product_name}
                            images={item.images}
                            price={item.price}
                            category={item.category}
                            Inventories={item.Inventories}
                            discountPrice={item.finalPrice}
                        />
                    </li>
                ))}
            </ul>

            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={Math.ceil(totalItems / ITEMS_PER_PAGE)}
            />
        </div>
    );
}

export default ListProduct;
