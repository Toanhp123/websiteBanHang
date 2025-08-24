import { useEffect, useState } from "react";
import ItemProduct from "./ItemProduct";
import { Pagination } from "@/components/shared";
import { ITEMS_PER_PAGE } from "@/constants/mics";
import { getProductByCondition } from "../services/product.api";
import type { Product } from "../types/product.type";
import bakery from "@/assets/images/categories/bakery.png";

function ListProduct() {
    const [page, setPage] = useState<number>(1);
    const [product, setProduct] = useState<Product[]>([]);

    const handleGetProduct = async () => {
        setProduct(await getProductByCondition());
    };

    useEffect(() => {
        handleGetProduct();
    }, []);

    const startIndex: number = (page - 1) * ITEMS_PER_PAGE;
    const endIndex: number = startIndex + ITEMS_PER_PAGE;
    const visibleItems = product.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <div className="space-y-12">
            <ul className="grid grid-cols-3 gap-6">
                {visibleItems.map((item) => (
                    <li key={item.product_id}>
                        <ItemProduct
                            totalStock={item.totalStock}
                            name={item.product_name}
                            img={bakery}
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
