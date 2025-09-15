import { useLocation } from "react-router-dom";
import type { Invoice, InvoiceDetail } from "../types/invoice.type";
import { useEffect, useState } from "react";
import { getInvoiceDetail } from "../services/invoice.api";
import { formatDate } from "@/utils/formatDate";

function InvoiceCompleteOrder() {
    const location = useLocation();
    const invoice: Invoice = location.state?.invoice;
    const [invoiceDetail, setInvoiceDetail] = useState<InvoiceDetail[]>([]);

    const handleGetInvoiceDetail = async (invoice_id: number) => {
        setInvoiceDetail(await getInvoiceDetail(invoice_id));
    };

    useEffect(() => {
        if (invoice.invoice_id) {
            handleGetInvoiceDetail(invoice.invoice_id);
        }
    }, [invoice]);

    return (
        <div className="space-y-4">
            <div className="bg-surface grid grid-cols-3 divide-x divide-gray-500 rounded-2xl py-4">
                <div className="px-4">
                    <p className="text-disable">Mã đơn hàng</p>
                    <p className="font-bold">{invoice.invoice_id}</p>
                </div>
                <div className="px-4">
                    <p className="text-disable">Phương thức thanh toán</p>
                    <p className="font-bold">PayPal</p>
                </div>
                <div className="px-4">
                    <p className="text-disable">Ngày đặt hàng</p>
                    <p className="font-bold">
                        {formatDate(invoice.invoice_date)}
                    </p>
                </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
                <h1 className="font-bold">Chi tiết đơn hàng</h1>
                <div className="border-b border-gray-200"></div>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">Sản phẩm</p>
                    <p className="font-semibold">Tạm tính</p>
                </div>

                {invoiceDetail.map((items, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="h-18 w-18 overflow-hidden rounded-xl">
                            <img
                                src={`http://localhost:3000/${items.image_url}`}
                                alt="image"
                            />
                        </div>

                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <p>{items.product_name}</p>
                                <p className="text-disable">
                                    Số lượng: {items.quantity}
                                </p>
                            </div>

                            <p>{Number(items.unit_final_amount)}</p>
                        </div>
                    </div>
                ))}
                <div className="border-b border-gray-200"></div>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">Thuế</p>
                    <p className="font-semibold">0</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">Giảm giá</p>
                    <p className="font-semibold">{invoice.discount_amount}</p>
                </div>
                <div className="border-b border-gray-200"></div>

                <div className="flex items-center justify-between">
                    <p className="font-semibold">Tổng cộng</p>
                    <p className="font-semibold">
                        {invoice.total_final_amount}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InvoiceCompleteOrder;
