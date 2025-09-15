import { SlideListCategories } from "@/features/categories/components";

function Categories() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-2xl font-bold md:text-3xl">
                    Danh Mục
                    <span className="text-main-primary"> Sản Phẩm</span>
                </h1>
            </div>

            <div>
                <SlideListCategories />
            </div>
        </div>
    );
}

export default Categories;
