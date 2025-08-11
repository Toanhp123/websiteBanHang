import { FilterOption } from "@/features/filters/components";
import { MenuProduct } from "@/features/products/components";

function ShopLayout() {
    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7/8 px-8 py-12">
                {/* Left menu */}
                <div className="flex-1">
                    <FilterOption />
                </div>

                {/* Right menu */}
                <div className="flex-2">
                    <MenuProduct />
                </div>
            </div>
        </div>
    );
}

export default ShopLayout;
