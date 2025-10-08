import { useEffect, useState } from "react";
import { getBlogCategory } from "../services/blog.api";
import type { BlogCategory } from "../types/blog.type";

function ListBlogCategory() {
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    const handleGetBlogCategory = async () => {
        const res = await getBlogCategory();

        if (res) {
            setCategories(res);
        }
    };

    useEffect(() => {
        handleGetBlogCategory();
    }, []);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="border-surface border-l-4 pl-3 text-xl font-semibold">
                    Search
                </h1>

                <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
            </div>

            <div className="space-y-4">
                <h1 className="border-surface border-l-4 pl-3 text-xl font-semibold">
                    List Category
                </h1>

                <div className="grid grid-cols-1 space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category.category_id}
                            className="hover:bg-main-primary rounded-xl border border-gray-300 px-4 py-3"
                        >
                            <p className="text-start font-semibold">
                                {category.name}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListBlogCategory;
