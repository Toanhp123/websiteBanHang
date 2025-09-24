import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import type { ProductDetail } from "../types/product.type";
import { getDetailProduct } from "../services/product.api";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Loading from "@/features/loading/components/Loading";

function DetailProductPopup({ id, popup }: EditPopupPros) {
    const [productDetail, setProductDetail] = useState<ProductDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleGetReceiptDetail = async (product_id: number) => {
        try {
            setLoading(true);
            const res = await getDetailProduct(product_id);
            console.log(res);

            setProductDetail(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetReceiptDetail(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b pb-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Product Detail
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

                {/* Content */}
                {loading ? (
                    <Loading />
                ) : !productDetail ? (
                    <div className="flex items-center justify-center py-20">
                        <span className="text-gray-500">No product found</span>
                    </div>
                ) : (
                    <div className="grid max-h-130 grid-cols-1 gap-6 overflow-auto md:grid-cols-3">
                        {/* Left: Image */}
                        <div className="col-span-1 flex flex-col items-center">
                            <div className="h-64 w-64 overflow-hidden rounded-xl border shadow-sm">
                                <img
                                    src={
                                        `http://localhost:3000/` +
                                        productDetail.images.find(
                                            (img) =>
                                                img.is_main === 1 &&
                                                img.product_id ===
                                                    productDetail.product_id,
                                        )?.image_url
                                    }
                                    alt="Product"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="col-span-2 flex flex-col space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {productDetail.product_name}
                            </h3>
                            <p className="text-gray-600">
                                {productDetail.product_description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-base">
                                <div>
                                    <span className="block text-gray-500">
                                        Category
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {productDetail.category}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">
                                        Supplier
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {productDetail.supplier}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">
                                        Price
                                    </span>
                                    <span className="font-bold text-green-600">
                                        {productDetail.price}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">
                                        Stock
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {productDetail.totalStock} units
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">
                                        Status
                                    </span>
                                    <span className="font-medium text-indigo-600">
                                        {productDetail.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">
                                        Date Added
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {formatDate(
                                            productDetail.product_date_add,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Info */}
                        <div className="col-span-3 space-y-6">
                            {/* Promotion */}
                            <div className="rounded-lg border bg-white p-5 shadow-md">
                                <h4 className="mb-3 text-lg font-semibold text-indigo-700">
                                    Promotion
                                </h4>

                                {productDetail.promotion ? (
                                    <div className="grid grid-cols-2 gap-4 text-base">
                                        <div>
                                            <span className="block text-gray-500">
                                                Name
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {
                                                    productDetail.promotion
                                                        .promotion_name
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-500">
                                                Status
                                            </span>
                                            <span
                                                className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                                                    productDetail.promotion
                                                        .promotion_status ===
                                                    "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {
                                                    productDetail.promotion
                                                        .promotion_status
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-500">
                                                Effect
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {productDetail.promotion
                                                    .PromotionEffects
                                                    ?.effect_value || "—"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-500">
                                                Distribution
                                            </span>
                                            <span className="font-medium text-gray-900 capitalize">
                                                {
                                                    productDetail.promotion
                                                        .distribution_type
                                                }
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="block text-gray-500">
                                                Valid Period
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {formatDate(
                                                    productDetail.promotion
                                                        .valid_from,
                                                )}{" "}
                                                →{" "}
                                                {formatDate(
                                                    productDetail.promotion
                                                        .valid_to,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        No promotion
                                    </p>
                                )}
                            </div>

                            {/* Inventories */}
                            <div className="rounded-lg border bg-white p-5 shadow-md">
                                <h4 className="mb-3 text-lg font-semibold text-indigo-700">
                                    Inventories
                                </h4>
                                <table className="w-full text-left text-base">
                                    <thead>
                                        <tr className="border-b text-gray-600">
                                            <th className="py-2">Warehouse</th>
                                            <th className="py-2">Quantity</th>
                                            <th className="py-2">
                                                Last Checked
                                            </th>
                                            <th className="py-2">Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productDetail.Inventories?.length ? (
                                            productDetail.Inventories.map(
                                                (inv) => (
                                                    <tr
                                                        key={inv.warehouse_id}
                                                        className="border-b text-gray-800"
                                                    >
                                                        <td className="py-2">
                                                            {inv.warehouse_id}
                                                        </td>
                                                        <td className="py-2">
                                                            {inv.quantity}
                                                        </td>
                                                        <td className="py-2">
                                                            {formatDate(
                                                                inv.last_checked_at,
                                                            )}
                                                        </td>
                                                        <td className="py-2">
                                                            {inv.is_active ? (
                                                                <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                                                                    Active
                                                                </span>
                                                            ) : (
                                                                <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-700">
                                                                    Inactive
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="py-2 text-center text-gray-500"
                                                >
                                                    No inventories found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default DetailProductPopup;
