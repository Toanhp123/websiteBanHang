import { Swiper, SwiperSlide } from "swiper/react";
import bakery from "@/assets/images/categories/bakery.png";
import ItemCategories from "./ItemCategories";
import { useCategories } from "@/hooks/useCategories";

function SlideListCategories() {
    const categories = useCategories();

    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
            }}
            spaceBetween={50}
        >
            {categories.categories.map((category) => (
                <SwiperSlide key={category.product_category_id}>
                    <ItemCategories
                        img={bakery}
                        name={category.product_category_name}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideListCategories;
