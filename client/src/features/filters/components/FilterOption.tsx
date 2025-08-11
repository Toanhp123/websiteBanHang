import type { Categories } from "@/features/categories/types/categories.type";
import { getCategories } from "@/services/getCategories.api";
import { useEffect, useState } from "react";

function FilterOption() {
    const [option, setOption] = useState("");
    const [listCategories, setListCategories] = useState<Categories[]>([]);

    const handleGetCategories = async () => {
        setListCategories(await getCategories());
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <div>
            <h1>FilterOption</h1>
            <div className="border-b border-gray-200"></div>

            <div>
                <p>Category</p>
                <ul>
                    {listCategories.map((category) => (
                        <li key={category.product_type_id}>
                            <label
                                key={category.product_type_name}
                                style={{ display: "block" }}
                            >
                                <input
                                    type="checkbox"
                                    value={category.product_type_name}
                                    checked={option.includes(
                                        category.product_type_name,
                                    )}
                                    onChange={() =>
                                        setOption(category.product_type_name)
                                    }
                                />
                                {category.product_type_name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-b border-gray-200"></div>

            <p>Price</p>
        </div>
    );
}

export default FilterOption;
