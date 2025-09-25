import { useEffect, useState } from "react";
import type { InvoiceDetail } from "@/features/invoice/types/invoice.type";
import { getInvoiceDetail } from "@/features/invoice/services/invoice.api";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";

function InvoiceDetailPopup({ id, popup }: EditPopupPros) {
    const [invoiceDetail, setInvoiceDetail] = useState<InvoiceDetail[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetInvoiceDetail = async (invoice_id: number) => {
        try {
            setLoading(true);
            const res = await getInvoiceDetail(invoice_id);

            setInvoiceDetail(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetInvoiceDetail(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b pb-3">
                    <h2 className="text-xl font-semibold">Chi tiết hóa đơn</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() =>
                            popup({
                                order: "",
                                mode: "",
                            })
                        }
                    >
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                {/* Body */}
                {loading ? (
                    <p className="text-center text-gray-500">Đang tải...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
                                    <th className="p-3">#</th>
                                    <th className="p-3">Ảnh</th>
                                    <th className="p-3">Sản phẩm</th>
                                    <th className="p-3 text-right">SL</th>
                                    <th className="p-3 text-right">Đơn giá</th>
                                    <th className="p-3 text-right">Giảm giá</th>
                                    <th className="p-3 text-right">
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceDetail.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b text-sm hover:bg-gray-50"
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">
                                            <img
                                                src={`http://localhost:3000/${item.image_url}`}
                                                alt={item.product_name}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                        </td>
                                        <td className="p-3 font-medium">
                                            {item.product_name}
                                        </td>
                                        <td className="p-3 text-right">
                                            {item.quantity}
                                        </td>
                                        <td className="p-3 text-right">
                                            {Number(
                                                item.unit_final_amount,
                                            ).toLocaleString()}
                                            ₫
                                        </td>
                                        <td className="p-3 text-right text-red-500">
                                            -
                                            {Number(
                                                item.discount_product,
                                            ).toLocaleString()}
                                            ₫
                                        </td>
                                        <td className="p-3 text-right font-semibold">
                                            {Number(
                                                item.total_final_amount,
                                            ).toLocaleString()}
                                            ₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer */}
                {invoiceDetail.length > 0 && (
                    <div className="mt-4 flex justify-end border-t pt-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Tổng cộng</p>
                            <p className="text-xl font-bold text-blue-600">
                                {invoiceDetail
                                    .reduce(
                                        (sum, item) =>
                                            sum +
                                            Number(item.total_final_amount),
                                        0,
                                    )
                                    .toLocaleString()}
                                ₫
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InvoiceDetailPopup;
