import { Dropdown, InputForDashboard } from "@/components/shared";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";

function AddProductForm() {
    const categories = useCategories();
    const formatDataCategories = categories.categories.map((category) => ({
        id: category.product_category_id,
        name: category.product_category_name,
    }));

    const [productTitle, setProductTitle] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    console.log(productTitle, productDescription, price, category);

    return (
        <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 space-y-6">
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Basic Info</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <InputForDashboard
                        label="Product title"
                        placeholder="Type Here"
                        value={productTitle}
                        setValue={setProductTitle}
                    />

                    <div>
                        <label className="text-md text-disable mb-2 block font-semibold">
                            Description
                        </label>

                        <textarea
                            rows={6}
                            placeholder="Type something here..."
                            className="w-full resize-none rounded-lg border border-gray-300 p-3"
                            value={productDescription}
                            onChange={(e) =>
                                setProductDescription(e.target.value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-8">
                        <InputForDashboard
                            label="Price"
                            value={price}
                            setValue={setPrice}
                            placeholder="0"
                            type="number"
                        />

                        <Dropdown
                            text="Category"
                            options={formatDataCategories}
                            value={category}
                            setValue={setCategory}
                        />
                    </div>
                </div>

                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <h1 className="text-xl font-semibold">Basic Info</h1>

                    <div className="mt-4 border-b border-gray-300"></div>
                </div>
            </div>

            <div className="col-span-2 space-y-6">
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    2
                </div>

                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    3
                </div>
            </div>
        </div>
    );
}

export default AddProductForm;
