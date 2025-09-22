import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import type { ProductDetail } from "../types/product.type";
import { getDetailProduct } from "../services/product.api";
import { useEffect, useState } from "react";

function DetailProductPopup({ id, popup }: EditPopupPros) {
    const [productDetail, setProductDetail] = useState<ProductDetail>();

    const handleGetReceiptDetail = async (product_id: number) => {
        try {
            const res = await getDetailProduct(product_id);

            console.log(res);

            setProductDetail(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetReceiptDetail(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b pb-3">
                    <h2 className="text-2xl font-bold">Product Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("product", "")}
                    >
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left: Image */}
                    <div className="col-span-1 flex flex-col items-center">
                        <div className="h-64 w-64 overflow-hidden rounded-xl border">
                            <img
                                src={
                                    `http://localhost:3000/` +
                                    productDetail?.images.filter(
                                        (img) =>
                                            img.is_main === 1 &&
                                            img.product_id ===
                                                productDetail.product_id,
                                    )[0].image_url
                                }
                                alt="Product"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="col-span-2 flex flex-col space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Sample Product Name
                        </h3>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer nec odio. Praesent libero.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold">Category:</span>{" "}
                                {productDetail?.category}
                            </div>
                            <div>
                                <span className="font-semibold">Supplier:</span>{" "}
                                {productDetail?.supplier}
                            </div>
                            <div>
                                <span className="font-semibold">Price:</span>{" "}
                                <span className="font-bold text-green-600">
                                    {productDetail?.price}
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold">Stock:</span> 35
                                units
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>{" "}
                                <span className="font-medium text-blue-600">
                                    Active
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Date Added:
                                </span>{" "}
                                2025-09-20
                            </div>
                        </div>

                        {/* Promotion */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h4 className="mb-2 text-lg font-semibold">
                                Promotion
                            </h4>
                            <p>
                                <span className="font-semibold">Name:</span>{" "}
                                Summer Sale
                            </p>
                            <p>
                                <span className="font-semibold">Discount:</span>{" "}
                                -20%
                            </p>
                            <p>
                                <span className="font-semibold">Valid:</span>{" "}
                                2025-09-01 → 2025-09-30
                            </p>
                        </div>

                        {/* Inventories */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h4 className="mb-2 text-lg font-semibold">
                                Inventories
                            </h4>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Warehouse</th>
                                        <th className="py-2">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-2">Main Warehouse</td>
                                        <td className="py-2">20</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2">Branch A</td>
                                        <td className="py-2">15</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                    <button
                        type="button"
                        onClick={() => popup("product", "")}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DetailProductPopup;
