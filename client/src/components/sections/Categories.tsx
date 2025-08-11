import { SlideListCategories } from "@/features/categories/components";

function Categories() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-xl font-semibold">Categories</p>
                <h1 className="text-2xl font-bold md:text-3xl">
                    Featured
                    <span className="text-primary"> Categories</span>
                </h1>
            </div>

            <div>
                <SlideListCategories />
            </div>
        </div>
    );
}

export default Categories;
