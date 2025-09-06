import { useGetProductAdvancedInfo } from "@/hooks/useGetProductBasicInfoFilter";
import { getDetailProduct, updateProduct } from "../services/product.api";
import type {
    EditProductModalProps,
    WarehouseQuantity,
} from "../types/product.type";
import { useEffect, useState } from "react";
import { Dropdown, InputForDashboard } from "@/components/shared";
import InputImageUpload from "@/components/shared/InputImageUpload";
import { useNavigate } from "react-router-dom";

function EditProduct({ product_id, setPopup }: EditProductModalProps) {
    const advanceInfo = useGetProductAdvancedInfo();
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
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
    const [productTypeID, setProductTypeID] = useState<string>("");
    const [productStatusID, setProductStatusID] = useState<string>("");

    const formatDataCategories =
        advanceInfo?.categories.map((category) => ({
            id: category.product_category_id,
            name: category.product_category_name,
        })) || [];

    const formatDataWarehouse =
        advanceInfo?.warehouse.map((warehouse) => ({
            id: warehouse.warehouse_id,
            name: warehouse.warehouse_name,
        })) || [];

    const formatDataSupplier =
        advanceInfo?.supplier.map((supplier) => ({
            id: supplier.supplier_id,
            name: supplier.supplier_name,
        })) || [];

    const formatDataProductType =
        advanceInfo?.productType.map((productType) => ({
            id: productType.product_type_id,
            name: productType.product_type_name,
        })) || [];

    const formatDataProductStatus =
        advanceInfo?.productStatus.map((status) => ({
            id: status.product_status_id,
            name: status.product_status_name,
        })) || [];

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

    useEffect(() => {
        const handleGetProductDetail = async (product_id: number) => {
            try {
                if (advanceInfo) {
                    const productDetail = await getDetailProduct(product_id);

                    setCategoryID(
                        formatDataCategories
                            .find(
                                (item) => item.name === productDetail.category,
                            )
                            ?.id.toString() || "",
                    );
                    setSupplierID(
                        formatDataSupplier
                            .find(
                                (item) => item.name === productDetail.supplier,
                            )
                            ?.id.toString() || "",
                    );
                    setProductTypeID(
                        formatDataProductType
                            .find((item) => item.name === productDetail.type)
                            ?.id.toString() || "",
                    );
                    setProductStatusID(
                        formatDataProductStatus
                            .find((item) => item.name === productDetail.status)
                            ?.id.toString() || "",
                    );
                    setName(productDetail.product_name);
                    setPrice(productDetail.price.toString());
                    setDescription(productDetail.product_description);
                    setWarehouseQuantities(productDetail.Inventories);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (product_id) {
            handleGetProductDetail(product_id);
        }
    }, [advanceInfo]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
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

        if (!product_id) return;

        const productInfo = {
            product_id: product_id.toString(),
            product_name: name,
            product_description: description,
            price: price,
            product_status_id: productStatusID,
            product_category_id: categoryID,
            supplier_id: supplierID,
            product_type_id: productTypeID,
        };

        Object.entries(productInfo).map(([key, value]) => {
            formData.append(key, value);
        });

        formData.append(
            "warehouseQuantities",
            JSON.stringify(warehouseQuantities),
        );

        try {
            const res = await updateProduct(formData);

            if (res.success) {
                console.log(res.message);

                navigate("/dashboard/productList");
            }
        } catch (error) {
            console.error("Failed to save:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                onSubmit={(e) => handleSave(e)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Edit Product</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => setPopup(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="grid max-h-[50vh] grid-cols-2 gap-6 overflow-y-auto p-2">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <InputForDashboard
                            label="Product Title"
                            placeholder="Text Here"
                            value={name}
                            setValue={setName}
                        />

                        <div>
                            <label className="text-md text-disable mb-2 block font-semibold">
                                Description
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Type something here..."
                                className="w-full resize-none rounded-lg border border-gray-300 p-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-8">
                            <InputForDashboard
                                label="Product Price"
                                placeholder="Text Here"
                                value={price}
                                setValue={setPrice}
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
                                text="Type"
                                value={productTypeID}
                                setValue={setProductTypeID}
                                options={formatDataProductType}
                            />

                            <Dropdown
                                text="Status"
                                value={productStatusID}
                                setValue={setProductStatusID}
                                options={formatDataProductStatus}
                            />
                        </div>

                        <Dropdown
                            text="Supplier"
                            value={supplierID}
                            setValue={setSupplierID}
                            options={formatDataSupplier}
                        />

                        {/* Inventory */}
                        <div className="mt-6">
                            <h3 className="mb-2 font-semibold">
                                Inventory / Stock
                            </h3>
                            <div className="space-y-2">
                                {formatDataWarehouse?.map((w) => (
                                    <div
                                        key={w.id}
                                        className="flex items-center gap-4"
                                    >
                                        <label className="flex-1">
                                            {w.name}
                                        </label>

                                        <input
                                            type="number"
                                            className="rounded-md bg-gray-100 p-2"
                                            placeholder="0"
                                            value={
                                                warehouseQuantities.find(
                                                    (x) =>
                                                        x.warehouse_id === w.id,
                                                )?.quantity || ""
                                            }
                                            onChange={(e) =>
                                                handleSetQuantityProduct(e, w)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Main Images
                                </label>

                                <InputImageUpload
                                    image={mainImage}
                                    setImage={setMainImage}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Sub Images
                                </label>

                                <div className="grid grid-cols-2 gap-4">
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
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                        onClick={() => setPopup(false)}
                    >
                        Cancel
                    </button>

                    <button className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
export default EditProduct;
