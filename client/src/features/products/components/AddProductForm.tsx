import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import InputImageUpload from "@/components/shared/InputImageUpload";
import { useState } from "react";
import { addProduct } from "../services/product.api";
import { useGetProductAdvancedInfo } from "@/hooks/useGetProductBasicInfoFilter";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    addProductSchema,
    type AddProductFormInputs,
} from "../validations/addProduct.schema";
import { useForm } from "react-hook-form";

function AddProductForm() {
    const advanceInfo = useGetProductAdvancedInfo();
    const navigate = useNavigate();

    // const [mainImage, setMainImage] = useState<File | null>(null);
    const [subImages, setSubImages] = useState<Array<File | null>>(
        Array(4).fill(null),
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AddProductFormInputs>({
        resolver: yupResolver(addProductSchema),
        defaultValues: {
            mainImage: null,
        },
    });

    const mainImage = watch("mainImage");

    const formatDataCategories =
        advanceInfo?.categories.map((category) => ({
            id: category.product_category_id,
            name: category.product_category_name,
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

    const handleAddProduct = async (data: AddProductFormInputs) => {
        const formData = new FormData();

        formData.append("mainImage", data.mainImage[0]);
        subImages.forEach((file) => {
            if (file) {
                formData.append("subImages", file);
            }
        });

        const productInfo = {
            product_name: data.productTitle,
            product_description: data.productDescription,
            product_category_id: data.categoryID,
            price: data.price,
            supplier_id: data.supplierID,
            product_type_id: data.productTypeID,
            product_code: data.productCode,
        };

        Object.entries(productInfo).map(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const res = await addProduct(formData);

            if (res.success) {
                console.log(res.message);

                navigate("/dashboard/productList");
            }
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

    return (
        <form
            className="grid grid-cols-5 gap-6"
            onSubmit={handleSubmit(handleAddProduct)}
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
                        register={register("productTitle")}
                        error={errors.productTitle?.message}
                    />

                    <div>
                        <label className="text-md text-disable mb-2 block font-semibold">
                            Description
                        </label>

                        <textarea
                            rows={6}
                            placeholder="Type something here..."
                            className="w-full resize-none rounded-lg border border-gray-300 p-3"
                            {...register("productDescription")}
                        />

                        {errors.productDescription && (
                            <p className="min-h-[20px] text-sm text-red-500">
                                {errors.productDescription.message}
                            </p>
                        )}
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
                        image={mainImage?.[0]}
                        register={register("mainImage")}
                        error={errors.mainImage?.message}
                    />
                </div>

                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Advanced Info</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <InputForDashboard
                        label="Product Code"
                        placeholder="Type Here"
                        register={register("productCode")}
                        error={errors.productCode?.message}
                    />

                    <InputForDashboard
                        label="Price"
                        placeholder="0"
                        type="number"
                        register={register("price")}
                        error={errors.price?.message}
                    />

                    <Dropdown
                        text="Category"
                        options={formatDataCategories}
                        register={register("categoryID")}
                        error={errors.categoryID?.message}
                    />

                    <Dropdown
                        text="Supplier"
                        options={formatDataSupplier}
                        register={register("supplierID")}
                        error={errors.supplierID?.message}
                    />

                    <Dropdown
                        text="Product Type"
                        options={formatDataProductType}
                        register={register("productTypeID")}
                        error={errors.productTypeID?.message}
                    />
                </div>

                <div className="inline-flex">
                    <Button text="Add product" textSize="small" />
                </div>
            </div>
        </form>
    );
}

export default AddProductForm;
