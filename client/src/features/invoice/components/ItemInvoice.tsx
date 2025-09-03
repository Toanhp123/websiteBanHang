import type { AllInvoiceDetail } from "../types/invoice.type";
import { useAppDispatch } from "@/hooks/useRedux";
import { TagItem } from "@/components/shared";
import { deleteOneItemInvoice } from "../redux/allInvoiceDetail.thunk";
import { formatDate } from "@/utils/formatDate";

function ItemInvoice(invoice: AllInvoiceDetail) {
    const dispatch = useAppDispatch();

    const handleDeleteInvoice = async (invoice_id: number | null) => {
        if (invoice_id) {
            dispatch(deleteOneItemInvoice(invoice_id));
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-300">
            <div className="bg-surface grid grid-cols-3 divide-x divide-gray-500 py-4">
                <div className="px-8">
                    <p className="text-disable">Order ID</p>
                    <p className="font-bold">{invoice.invoice_id}</p>
                </div>
                <div className="px-8">
                    <p className="text-disable">Payment Method</p>
                    <p className="font-bold">PayPal</p>
                </div>
                <div className="px-8">
                    <p className="text-disable">Order Date</p>
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
                                quantity: {invoiceDetail.quantity}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 border-b border-gray-300"></div>
                </div>
            ))}

            <div className="px-8 py-4">
                <div className="flex items-center gap-4">
                    <TagItem text={invoice.status} isTagOnly={true} />

                    {invoice.status === "canceled" && (
                        <p className="font-semibold">
                            Your order has been canceled
                        </p>
                    )}
                    {invoice.status === "pending" && (
                        <div className="flex flex-1 justify-between">
                            <p className="font-semibold">
                                Your order is being process
                            </p>

                            <p
                                className="text-main-primary font-semibold"
                                onClick={() =>
                                    handleDeleteInvoice(invoice.invoice_id)
                                }
                            >
                                Cancel Order
                            </p>
                        </div>
                    )}
                    {invoice.status === "paid" && (
                        <p className="font-semibold">
                            Your order has been accepted
                        </p>
                    )}
                    {invoice.status === "refunded" && (
                        <p className="font-semibold">
                            Your order has been refunded
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemInvoice;
