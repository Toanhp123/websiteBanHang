import { useGetProductAdvancedInfo } from "@/hooks/useGetProductBasicInfoFilter";
import { getDetailProduct, updateProduct } from "../services/product.api";
import { useEffect, useState } from "react";
import { Dropdown, InputForDashboard } from "@/components/shared";
import InputImageUpload from "@/components/shared/InputImageUpload";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    editProductSchema,
    type EditProductFormInputs,
} from "../validations/editProduct.schema";
import type { ProductImage } from "../types/product.type";
import isEqual from "lodash/isEqual";

function EditProduct({ id, popup }: EditPopupPros) {
    const advanceInfo = useGetProductAdvancedInfo();

    const [originalData, setOriginalData] = useState<unknown>(null);
    const [mainImage, setMainImage] = useState<ProductImage | null>(null);
    const [subImages, setSubImages] = useState<Array<ProductImage | null>>(
        Array(4).fill(null),
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EditProductFormInputs>({
        // @ts-expect-error yup type mismatch
        resolver: yupResolver(editProductSchema),
        defaultValues: {
            product_name: "",
            product_description: "",
            price: 0,
            product_status_id: "",
            product_category_id: "",
            supplier_id: "",
            product_type_id: "",
            mainImage: null,
            subImages: [],
        },
    });

    const currentData = watch();
    const mainImageFile = watch("mainImage");

    const isChanged = originalData && !isEqual(originalData, currentData);

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

    const formatDataProductStatus =
        advanceInfo?.productStatus.map((status) => ({
            id: status.product_status_id,
            name: status.product_status_name,
        })) || [];

    const handleGetProductDetail = async (product_id: number) => {
        try {
            if (advanceInfo) {
                const productDetail = await getDetailProduct(product_id);

                const data = {
                    product_name: productDetail.product_name,
                    product_description: productDetail.product_description,
                    price: productDetail.price.toString(),
                    product_status_id:
                        formatDataProductStatus
                            .find((item) => item.name === productDetail.status)
                            ?.id.toString() || "",
                    product_category_id:
                        formatDataCategories
                            .find(
                                (item) => item.name === productDetail.category,
                            )
                            ?.id.toString() || "",
                    supplier_id:
                        formatDataSupplier
                            .find(
                                (item) => item.name === productDetail.supplier,
                            )
                            ?.id.toString() || "",
                    product_type_id:
                        formatDataProductType
                            .find((item) => item.name === productDetail.type)
                            ?.id.toString() || "",
                    mainImage: null,
                    subImages: [],
                };

                setMainImage(
                    productDetail.images.filter(
                        (item) => item.is_main === 1,
                    )[0],
                );

                const subImagesFromServer = productDetail.images.filter(
                    (item) => item.is_main !== 1,
                );

                const subImagesArray: Array<ProductImage | null> = [
                    ...subImagesFromServer,
                    ...Array(4 - subImagesFromServer.length).fill(null),
                ];

                setSubImages(subImagesArray);

                Object.entries(data).forEach(([key, value]) => {
                    setValue(key as keyof EditProductFormInputs, value);
                });

                setOriginalData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getChangedFields = () => {
        if (!originalData) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(currentData).forEach(([key, value]) => {
            if (
                !isEqual((originalData as Record<string, unknown>)[key], value)
            ) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handleSave = async () => {
        const changes = getChangedFields();

        const formData = new FormData();

        Object.entries(changes).forEach(([key, value]) => {
            if (key === "subImages" && Array.isArray(value)) {
                value.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("subImages", file);
                    }
                });
            } else if (key === "mainImage" && value instanceof FileList) {
                formData.append("mainImage", value[0]);
            } else {
                formData.append(key, value as string);
            }
        });

        try {
            const res = await updateProduct(formData, Number(id));
            if (res.success) {
                console.log(res.message);
                popup({
                    product: "",
                    mode: "",
                });
            }
        } catch (error) {
            console.error("Lưu thất bại:", error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetProductDetail(Number(id));
        }
    }, [advanceInfo]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                onSubmit={handleSubmit(handleSave)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Chỉnh sửa sản phẩm
                    </h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() =>
                            popup({
                                product: "",
                                mode: "",
                            })
                        }
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="grid max-h-[50vh] grid-cols-2 gap-6 overflow-y-auto p-2">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <InputForDashboard
                            label="Tên sản phẩm"
                            placeholder="Nhập tên sản phẩm"
                            register={register("product_name")}
                            error={errors.product_name?.message}
                        />

                        <div>
                            <label className="text-md text-disable mb-2 block font-semibold">
                                Mô tả
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Nhập mô tả sản phẩm..."
                                className="w-full resize-none rounded-lg border border-gray-300 p-3"
                                {...register("product_description")}
                            />

                            {errors.product_description && (
                                <p className="min-h-[20px] text-sm text-red-500">
                                    {errors.product_description.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 items-center gap-8">
                            <InputForDashboard
                                type="number"
                                label="Giá sản phẩm"
                                placeholder="Nhập giá"
                                register={register("price")}
                                error={errors.price?.message}
                            />

                            <Dropdown
                                text="Danh mục"
                                options={formatDataCategories}
                                register={register("product_category_id")}
                                error={errors.product_category_id?.message}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-8">
                            <Dropdown
                                text="Loại sản phẩm"
                                options={formatDataProductType}
                                register={register("product_type_id")}
                                error={errors.product_type_id?.message}
                            />

                            <Dropdown
                                text="Trạng thái"
                                options={formatDataProductStatus}
                                register={register("product_status_id")}
                                error={errors.product_status_id?.message}
                            />
                        </div>

                        <Dropdown
                            text="Nhà cung cấp"
                            options={formatDataSupplier}
                            register={register("supplier_id")}
                            error={errors.supplier_id?.message}
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Ảnh chính
                                </label>

                                <InputImageUpload
                                    image={
                                        mainImageFile
                                            ? mainImageFile[0]
                                            : mainImage
                                              ? mainImage.image_url
                                              : null
                                    }
                                    register={register("mainImage")}
                                    error={errors.mainImage?.message}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Ảnh phụ
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    {subImages.map((subImage, index) => (
                                        <InputImageUpload
                                            id={index.toString()}
                                            key={index}
                                            image={
                                                subImage
                                                    ? subImage instanceof File
                                                        ? subImage
                                                        : subImage.image_url
                                                    : null
                                            }
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
                        onClick={() =>
                            popup({
                                product: "",
                                mode: "",
                            })
                        }
                    >
                        Hủy
                    </button>

                    <button
                        className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white disabled:bg-gray-500"
                        disabled={!isChanged}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}
export default EditProduct;
