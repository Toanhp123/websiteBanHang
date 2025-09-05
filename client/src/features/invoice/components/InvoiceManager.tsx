import { useEffect, useState } from "react";
import { getOrderList, updateOrderStatus } from "../services/invoice.api";
import { isOrderStatus, type OrdersItem } from "../types/invoice.type";
import { formatDate } from "@/utils/formatDate";
import { Button, TagItem } from "@/components/shared";

function InvoiceManager() {
    const [orderList, setOrderList] = useState<OrdersItem[]>([]);
    const [editMenu, setEditMenu] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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

    const disableButtonBaseOptionStatus = (status: string): boolean => {
        return (
            status === "paid" || status === "cancelled" || status === "refunded"
        );
    };

    const handleLoadMoreOrders = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        const handleGetOrdersList = async () => {
            try {
                const res = await getOrderList(5, page);

                setOrderList((prev) => {
                    const merged = [...prev, ...res.orderList];
                    const map = new Map(
                        merged.map((item) => [item.invoice_id, item]),
                    );

                    return Array.from(map.values());
                });
                setHasMore(res.hasMore);
            } catch (error) {
                console.log(error);
            }
        };

        handleGetOrdersList();
    }, [page]);

    return (
        <div
            className="space-y-8 rounded-2xl bg-white px-8 py-6"
            onClick={() => {
                if (editMenu) {
                    setEditMenu(null);
                }
            }}
        >
            <div>
                <p className="font-semibold">
                    We found {orderList.length} items for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            {orderList.length > 0 && (
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
                                <td className="px-4 py-4">
                                    {order.invoice_id}
                                </td>
                                <td className="px-4 py-4">{order.email}</td>
                                <td className="px-4 py-4 text-left">
                                    {order.total_final_amount}
                                </td>
                                <td className="px-4 py-4">
                                    <TagItem
                                        text={order.status.toUpperCase()}
                                        isTagOnly={true}
                                    />
                                </td>
                                <td className="px-4 py-4">
                                    {formatDate(order.invoice_date)}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                handleOpenEditMenu(
                                                    order.invoice_id,
                                                )
                                            }
                                            className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </button>

                                        {editMenu === order.invoice_id && (
                                            <div className="shadow-light absolute top-8 right-0 z-50 h-35 w-50 rounded-2xl bg-white">
                                                <div className="flex h-full w-full flex-col px-4 py-2">
                                                    <button
                                                        className="text-main-primary disabled:text-disable hover:text-main-secondary flex flex-1 items-center font-semibold hover:cursor-pointer"
                                                        disabled={disableButtonBaseOptionStatus(
                                                            order.status,
                                                        )}
                                                        onClick={() =>
                                                            handleUpdateStatusOrder(
                                                                "paid",
                                                                order.invoice_id,
                                                            )
                                                        }
                                                    >
                                                        Accept Order
                                                    </button>

                                                    <button
                                                        className="disabled:text-disable flex flex-1 items-center font-semibold text-red-600 hover:cursor-pointer hover:text-red-500"
                                                        disabled={disableButtonBaseOptionStatus(
                                                            order.status,
                                                        )}
                                                        onClick={() =>
                                                            handleUpdateStatusOrder(
                                                                "cancelled",
                                                                order.invoice_id,
                                                            )
                                                        }
                                                    >
                                                        Cancelled Order
                                                    </button>

                                                    <button
                                                        className="flex flex-1 items-center font-semibold text-pink-600 hover:cursor-pointer hover:text-pink-500"
                                                        onClick={() =>
                                                            handleUpdateStatusOrder(
                                                                "cancelled",
                                                                order.invoice_id,
                                                            )
                                                        }
                                                    >
                                                        Detail
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {orderList.length === 0 && (
                <div className="text-main-primary text-center font-semibold">
                    No More Order !
                </div>
            )}

            {orderList.length > 0 && (
                <div className="text-center">
                    <div className="inline-flex">
                        <Button
                            text="Load More"
                            textSize="small"
                            type="small"
                            onClick={handleLoadMoreOrders}
                            disabled={!hasMore}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InvoiceManager;
