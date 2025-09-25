import type { AllInvoiceDetail } from "../types/invoice.type";
import { useAppDispatch } from "@/hooks/useRedux";
import { TagItem } from "@/components/shared";
import {
    deleteOneItemInvoice,
    refundedInvoiceAsync,
} from "../redux/allInvoiceDetail.thunk";
import { formatDate } from "@/utils/formatDate";

function ItemInvoice(invoice: AllInvoiceDetail) {
    const dispatch = useAppDispatch();

    const handleDeleteInvoice = async (invoice_id: number | null) => {
        if (invoice_id) {
            dispatch(deleteOneItemInvoice(invoice_id));
        }
    };

    const handleRefundedInvoice = async (invoice_id: number | null) => {
        if (invoice_id) {
            dispatch(refundedInvoiceAsync(invoice_id));
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-300">
            <div className="bg-surface grid grid-cols-3 divide-x divide-gray-500 py-4">
                <div className="px-8">
                    <p className="text-disable">Mã đơn hàng</p>
                    <p className="font-bold">{invoice.invoice_id}</p>
                </div>
                <div className="px-8">
                    <p className="text-disable">Phương thức thanh toán</p>
                    <p className="font-bold">PayPal</p>
                </div>
                <div className="px-8">
                    <p className="text-disable">Ngày đặt hàng</p>
                    <p className="font-bold">
                        {formatDate(invoice.invoice_date)}
                    </p>
                </div>
            </div>

            {invoice.products.map((invoiceDetail, index) => (
                <div key={index} className="mt-4 px-8">
                    <div className="flex gap-4">
                        <div className="h-18 w-18 rounded-xl border border-gray-300 p-2">
                            <img
                                src={`http://localhost:3000/${invoiceDetail.image_url}`}
                                alt="image"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-center">
                            <p className="font-bold">
                                {invoiceDetail.product_name}
                            </p>

                            <p className="text-disable">
                                Số lượng: {invoiceDetail.quantity}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 border-b border-gray-300"></div>
                </div>
            ))}

            <div className="px-8 py-4">
                <div className="flex items-center gap-4">
                    <TagItem text={invoice.status} isTagOnly={true} />

                    {invoice.status === "cancelled" && (
                        <p className="font-semibold">
                            Đơn hàng của bạn đã bị hủy
                        </p>
                    )}
                    {invoice.status === "pending" && (
                        <div className="flex flex-1 justify-between">
                            <p className="font-semibold">
                                Đơn hàng của bạn đang được xử lý
                            </p>

                            <p
                                className="text-main-primary cursor-pointer font-semibold"
                                onClick={() =>
                                    handleDeleteInvoice(invoice.invoice_id)
                                }
                            >
                                Hủy đơn hàng
                            </p>
                        </div>
                    )}
                    {invoice.status === "paid" && (
                        <div className="flex flex-1 justify-between">
                            <p className="font-semibold">
                                Đơn hàng của bạn đã được chấp nhận
                            </p>

                            <p
                                className="text-main-primary cursor-pointer font-semibold"
                                onClick={() =>
                                    handleRefundedInvoice(invoice.invoice_id)
                                }
                            >
                                Hoàn trả
                            </p>
                        </div>
                    )}
                    {invoice.status === "refunded" && (
                        <p className="font-semibold">
                            Đơn hàng của bạn đã được hoàn tiền
                        </p>
                    )}
                    {invoice.status === "refund_requested" && (
                        <p className="font-semibold">
                            Yêu cầu hoàn trả đang được xem xét
                        </p>
                    )}
                    {invoice.status === "refund_rejected" && (
                        <p className="font-semibold">
                            Yêu cầu hoàn trả bị từ chối
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemInvoice;
