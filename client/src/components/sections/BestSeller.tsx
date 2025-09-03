import { SlideListProduct } from "@/features/products/components";
import { Button } from "../shared";

function BestSeller() {
    return (
        <div className="space-y-12">
            <div>
                <p className="w-full text-center text-xl font-semibold sm:text-start">
                    Best Seller
                </p>
                <div className="flex items-center">
                    <h1 className="flex-1 text-2xl font-bold sm:flex-4 md:text-3xl">
                        <span className="text-main-primary">Best Seller </span>
                        Products
                    </h1>

                    <div className="flex-1">
                        <Button
                            text="View All"
                            icon="fa-solid fa-arrow-right"
                            iconBefore={false}
                        />
                    </div>
                </div>
            </div>

            <div>
                <SlideListProduct options="best sell" />
            </div>
        </div>
    );
}

export default BestSeller;
