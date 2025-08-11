import { useEffect, useState } from "react";
import type { Categories } from "../types/categories.type";
import { Swiper, SwiperSlide } from "swiper/react";
import bakery from "@/assets/images/categories/bakery.png";
import ItemCategories from "./ItemCategories";
import { getCategories } from "@/services/getCategories.api";

function SlideListCategories() {
    const [listCategories, setListCategories] = useState<Categories[]>([]);

    const handleGetCategories = async () => {
        setListCategories(await getCategories());
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
        >
            {listCategories.map((category) => (
                <SwiperSlide key={category.product_type_id}>
                    <ItemCategories
                        img={bakery}
                        name={category.product_type_name}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideListCategories;
