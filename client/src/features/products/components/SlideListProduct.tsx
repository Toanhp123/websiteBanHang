import { Swiper, SwiperSlide } from "swiper/react";
import ItemProduct from "./ItemProduct";
import { useEffect, useState } from "react";
import {
    getBestSellerProduct,
    getLatestProduct,
} from "../services/product.api";
import type { Product, SlideListProductPros } from "../types/product.type";
import bakery from "@/assets/images/categories/bakery.png";

function SlideListProduct({ options }: SlideListProductPros) {
    const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        const handleGetProduct = async () => {
            if (options === "latest") {
                setProduct(await getLatestProduct());
            } else if (options === "best sell") {
                setProduct(await getBestSellerProduct());
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
                        id={item.product_id}
                        name={item.product_name}
                        category={item.category}
                        price={item.price}
                        totalStock={item.totalStock}
                        img={bakery}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideListProduct;
