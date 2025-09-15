import { SlideListProduct } from "@/features/products/components";
import { Button } from "../shared";

function BestSeller() {
    return (
        <div className="space-y-12">
            <div>
                <div className="flex items-center">
                    <h1 className="flex-1 text-2xl font-bold sm:flex-4 md:text-3xl">
                        <span className="text-main-primary">Sản Phẩm </span>
                        Bán Chạy Nhất
                    </h1>

                    <div className="flex-1">
                        <Button
                            text="Xem Tất Cả"
                            icon="fa-solid fa-arrow-right"
                            iconBefore={false}
                        />
                    </div>
                </div>
            </div>

            <div>
                <SlideListProduct options="Bán chạy" />
            </div>
        </div>
    );
}

export default BestSeller;
