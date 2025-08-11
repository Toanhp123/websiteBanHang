import { Swiper, SwiperSlide } from "swiper/react";
import ItemProduct from "./ItemProduct";

function SlideListProduct() {
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
            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>

            <SwiperSlide>
                <ItemProduct />
            </SwiperSlide>
        </Swiper>
    );
}

export default SlideListProduct;
