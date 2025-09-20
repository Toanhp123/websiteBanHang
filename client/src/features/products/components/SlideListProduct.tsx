import { Swiper, SwiperSlide } from "swiper/react";
import ItemProduct from "./ItemProduct";
import { useEffect, useState } from "react";
import { getProductByCondition } from "../services/product.api";
import type { Product, SlideListProductPros } from "../types/product.type";
import { ITEMS_PER_PAGE } from "@/constants/mics.constants";

function SlideListProduct({ options }: SlideListProductPros) {
    const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        const handleGetProduct = async () => {
            if (options === "Mới nhất") {
                const res = await getProductByCondition({
                    option: "Mới nhất",
                    page: 1,
                    itemsPerPage: ITEMS_PER_PAGE,
                });
                setProduct(res.data);
            } else if (options === "Bán chạy") {
                const res = await getProductByCondition({
                    option: "Bán chạy",
                    page: 1,
                    itemsPerPage: ITEMS_PER_PAGE,
                });
                setProduct(res.data);
            }
        };

        handleGetProduct();
    }, [options]);

    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 1 },
                620: { slidesPerView: 1.6 },
                740: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3.5 },
                1600: { slidesPerView: 5 },
            }}
            spaceBetween={50}
        >
            {product.map((item) => (
                <SwiperSlide key={item.product_id}>
                    <ItemProduct
                        product_id={item.product_id}
                        product_name={item.product_name}
                        category={item.category}
                        price={item.price}
                        totalStock={item.totalStock}
                        images={item.images}
                        Inventories={item.Inventories}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideListProduct;
