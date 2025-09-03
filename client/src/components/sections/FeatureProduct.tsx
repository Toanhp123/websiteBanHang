import { SlideListProduct } from "@/features/products/components";
import { Button } from "../shared";

function FeatureProduct() {
    return (
        <div className="space-y-12">
            <div>
                <p className="w-full text-center text-xl font-semibold sm:text-start">
                    Products
                </p>
                <div className="flex items-center">
                    <h1 className="flex-1 text-2xl font-bold sm:flex-4 md:text-3xl">
                        Feature{" "}
                        <span className="text-main-primary">Products</span>
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
                <SlideListProduct options="latest" />
            </div>
        </div>
    );
}

export default FeatureProduct;
