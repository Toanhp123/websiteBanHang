import { useEffect, useState } from "react";
import { getOrderList, updateOrderStatus } from "../services/invoice.api";
import { isOrderStatus, type OrdersItem } from "../types/invoice.type";
import { formatDate } from "@/utils/formatDate";
import { TagItem } from "@/components/shared";

function InvoiceManager() {
    const [orderList, setOrderList] = useState<OrdersItem[]>([]);
    const [editMenu, setEditMenu] = useState<number | null>(null);

    const handleOpenEditMenu = (invoice_id: number) => {
        setEditMenu((prev) => (prev === invoice_id ? null : invoice_id));
    };

    const handleUpdateStatusOrder = async (
        status: string,
        invoice_id: number,
    ) => {
        handleOpenEditMenu(invoice_id);

        if (isOrderStatus(status)) {
            try {
                await updateOrderStatus(status, invoice_id);

                setOrderList((prev) =>
                    prev.map((order) =>
                        order.invoice_id === invoice_id
                            ? { ...order, status }
                            : order,
                    ),
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const handleGetOrdersList = async () => {
            const res = await getOrderList();

            setOrderList(res);
        };

        handleGetOrdersList();
    }, []);

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div className="flex justify-between">
                <p>We found 13 items for you</p>

                <div></div>
            </div>
            <div className="border-b border-gray-300"></div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2 text-right">Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {orderList.map((order) => (
                        <tr
                            key={order.invoice_id}
                            className="hover:bg-gray-200"
                        >
                            <td className="px-4 py-4">{order.invoice_id}</td>
                            <td className="px-4 py-4">{order.email}</td>
                            <td className="px-4 py-4 text-left">
                                {order.total_final_amount}
                            </td>
                            <td className="px-4 py-4">
                                <TagItem text={order.status} isTagOnly={true} />
                            </td>
                            <td className="px-4 py-4">
                                {formatDate(order.invoice_date)}
                            </td>
                            <td className="px-4 py-4 text-right">
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            handleOpenEditMenu(order.invoice_id)
                                        }
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {editMenu === order.invoice_id && (
                                        <div className="shadow-light absolute top-8 right-0 z-50 h-25 w-40 rounded-2xl bg-white">
                                            <div className="flex h-full w-full flex-col px-4 py-2">
                                                <div
                                                    className="flex flex-1 items-center"
                                                    onClick={() =>
                                                        handleUpdateStatusOrder(
                                                            "paid",
                                                            order.invoice_id,
                                                        )
                                                    }
                                                >
                                                    <p className="text-main-primary font-semibold">
                                                        Accept Order
                                                    </p>
                                                </div>

                                                <div
                                                    className="flex flex-1 items-center"
                                                    onClick={() =>
                                                        handleUpdateStatusOrder(
                                                            "cancelled",
                                                            order.invoice_id,
                                                        )
                                                    }
                                                >
                                                    <p className="font-semibold text-red-500">
                                                        Cancelled Order
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoiceManager;
