import { Swiper, SwiperSlide } from "swiper/react";
import ItemProduct from "./ItemProduct";
import { useEffect, useState } from "react";
import { getProductByCondition } from "../services/product.api";
import type { Product, SlideListProductPros } from "../types/product.type";

function SlideListProduct({ options }: SlideListProductPros) {
    const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        const handleGetProduct = async () => {
            if (options === "latest") {
                setProduct(await getProductByCondition({ option: "latest" }));
            } else if (options === "best sell") {
                setProduct(await getProductByCondition({ option: "best" }));
            }
        };

        handleGetProduct();
    }, []);

    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 1 },
                620: { slidesPerView: 1.6 },
                740: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3.3 },
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
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideListProduct;
