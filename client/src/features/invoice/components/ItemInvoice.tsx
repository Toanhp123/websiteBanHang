import { useEffect } from "react";
import type { AllInvoiceDetail } from "../types/invoice.type";
import { getInvoice } from "../services/invoice.api";
import { selectInvoice, setInvoice } from "../redux/invoice.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TagItem } from "@/components/shared";
import { deleteOneItemInvoice } from "../redux/allInvoiceDetail.thunk";

function ItemInvoice(invoice: AllInvoiceDetail) {
    const basicInfoInvoice = useAppSelector(selectInvoice);
    const dispatch = useAppDispatch();

    const handleDeleteInvoice = async (invoice_id: number | null) => {
        if (invoice_id) {
            dispatch(deleteOneItemInvoice(invoice_id));
        }
    };

    useEffect(() => {
        const handleGetBasicInvoiceInfo = async () => {
            const res = await getInvoice(invoice.invoice_id);

            if (res && res.invoice_id) {
                dispatch(setInvoice(res));
            }
        };

        handleGetBasicInvoiceInfo();
    }, []);

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
                        {new Date(
                            basicInfoInvoice.invoice_date,
                        ).toLocaleDateString("vi-VN")}
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
                    <TagItem text={basicInfoInvoice.status} isTagOnly={true} />

                    {basicInfoInvoice.status === "canceled" && (
                        <p className="font-semibold">
                            Your order has been canceled
                        </p>
                    )}
                    {basicInfoInvoice.status === "pending" && (
                        <div className="flex flex-1 justify-between">
                            <p className="font-semibold">
                                Your order is being process
                            </p>

                            <p
                                className="text-primary font-semibold"
                                onClick={() =>
                                    handleDeleteInvoice(invoice.invoice_id)
                                }
                            >
                                Cancel Order
                            </p>
                        </div>
                    )}
                    {basicInfoInvoice.status === "paid" && (
                        <div className="flex">
                            <p className="font-semibold">
                                Your order has been accepted
                            </p>

                            <p
                                className="text-primary font-semibold"
                                onClick={() =>
                                    handleDeleteInvoice(invoice.invoice_id)
                                }
                            >
                                Cancel Order
                            </p>
                        </div>
                    )}
                    {basicInfoInvoice.status === "refunded" && (
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
