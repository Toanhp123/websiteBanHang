import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import InputImageUpload from "@/components/shared/InputImageUpload";
import { useCategories } from "@/hooks/useCategories";
import { useGetSupplier } from "@/hooks/useGetSupplier";
import { useGetWarehouse } from "@/hooks/useGetWarehouse";
import { useState } from "react";
import type { WarehouseQuantity } from "../types/product.type";
import { addProduct } from "../services/product.api";
import { useGetProductType } from "@/hooks/useGetProductType";

function AddProductForm() {
    const categories = useCategories();
    const warehouseList = useGetWarehouse();
    const supplierList = useGetSupplier();
    const productTypeList = useGetProductType();

    const [price, setPrice] = useState<string>("");
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [subImages, setSubImages] = useState<Array<File | null>>(
        Array(4).fill(null),
    );
    const [warehouseQuantities, setWarehouseQuantities] = useState<
        WarehouseQuantity[]
    >([]);
    const [supplierID, setSupplierID] = useState<string>("");
    const [categoryID, setCategoryID] = useState<string>("");
    const [productCode, setProductCode] = useState<string>("");
    const [productTitle, setProductTitle] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productTypeID, setProductTypeID] = useState<string>("");

    const formatDataCategories = categories?.categories.map((category) => ({
        id: category.product_category_id,
        name: category.product_category_name,
    }));

    const formatDataWarehouse = warehouseList?.map((warehouse) => ({
        id: warehouse.warehouse_id,
        name: warehouse.warehouse_name,
    }));

    const formatDataSupplier = supplierList?.map((supplier) => ({
        id: supplier.supplier_id,
        name: supplier.supplier_name,
    }));

    const formatDataProductType = productTypeList?.map((productType) => ({
        id: productType.product_type_id,
        name: productType.product_type_name,
    }));

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        if (mainImage) {
            formData.append("mainImage", mainImage);
        }

        subImages.forEach((file) => {
            if (file) {
                formData.append("subImages", file);
            }
        });

        const productInfo = {
            product_name: productTitle,
            product_description: productDescription,
            product_category_id: categoryID,
            price: price,
            supplier_id: supplierID,
            product_type_id: productTypeID,
            product_code: productCode,
        };

        Object.entries(productInfo).map(([key, value]) => {
            formData.append(key, value);
        });

        formData.append(
            "warehouseQuantities",
            JSON.stringify(warehouseQuantities),
        );

        try {
            const res = await addProduct(formData);

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetSubImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0] || null;
        const { id } = e.currentTarget;

        setSubImages((prev) => {
            const updated = [...prev];
            updated[Number(id)] = file;

            return updated;
        });
    };

    const handleSetQuantityProduct = (
        e: React.ChangeEvent<HTMLInputElement>,
        warehouse: { id: number; name: string },
    ) => {
        const newQuantity = Number(e.target.value);

        setWarehouseQuantities((prev) => {
            const exists = prev.find((x) => x.warehouse_id === warehouse.id);

            if (exists) {
                return prev.map((item) =>
                    item.warehouse_id === warehouse.id
                        ? {
                              ...item,
                              quantity: newQuantity,
                          }
                        : item,
                );
            } else {
                return [
                    ...prev,
                    {
                        warehouse_id: warehouse.id,
                        quantity: newQuantity,
                    },
                ];
            }
        });
    };

    return (
        <form
            className="grid grid-cols-5 gap-6"
            onSubmit={(e) => handleAddProduct(e)}
        >
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

                    <InputForDashboard
                        label="Product Code"
                        value={productCode}
                        setValue={setProductCode}
                        placeholder="Type Here"
                    />

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
                            value={categoryID}
                            setValue={setCategoryID}
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-8">
                        <Dropdown
                            text="Supplier"
                            value={supplierID}
                            setValue={setSupplierID}
                            options={formatDataSupplier}
                        />

                        <Dropdown
                            text="Product Type"
                            value={productTypeID}
                            setValue={setProductTypeID}
                            options={formatDataProductType}
                        />
                    </div>
                </div>

                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Addition Images
                        </h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {subImages.map((subImage, index) => (
                            <InputImageUpload
                                id={index.toString()}
                                required={false}
                                key={index}
                                image={subImage}
                                setListImage={handleSetSubImage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-span-2 space-y-6">
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Main Image</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <InputImageUpload
                        image={mainImage}
                        setImage={setMainImage}
                    />
                </div>

                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Inventory</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    {formatDataWarehouse?.map((w) => (
                        <div key={w.id} className="flex items-center gap-4">
                            <label className="flex-1">{w.name}</label>

                            <input
                                type="number"
                                className="rounded-md bg-gray-100 p-2"
                                placeholder="0"
                                value={
                                    warehouseQuantities.find(
                                        (x) => x.warehouse_id === w.id,
                                    )?.quantity || ""
                                }
                                onChange={(e) => handleSetQuantityProduct(e, w)}
                            />
                        </div>
                    ))}
                </div>

                <div className="inline-flex">
                    <Button text="Add product" textSize="small" />
                </div>
            </div>
        </form>
    );
}

export default AddProductForm;
