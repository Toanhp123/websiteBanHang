import { useEffect, useState } from "react";
import type { EditPopupPros, ReceiptBasicInfo } from "../types/warehouse.type";
import { getReceiptBasicInfo } from "../services/warehouse.api";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/shared";

function ReceiptRefundedTable({ popup }: EditPopupPros) {
    const [receiptBasic, setReceiptBasic] = useState<ReceiptBasicInfo[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        const handleGetReceiptBasicInfo = async () => {
            try {
                const res = await getReceiptBasicInfo(5, page, "customer");

                setReceiptBasic((prev) => {
                    const merged = [...prev, ...res.warehouseReceiptList];
                    const map = new Map(
                        merged.map((item) => [item.receipt_id, item]),
                    );

                    return Array.from(map.values());
                });
                setHasMore(res.hasMore);
            } catch (error) {
                console.log(error);
            }
        };

        handleGetReceiptBasicInfo();
    }, [page]);

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div>
                <p className="font-semibold">
                    Tìm thấy {receiptBasic.length} phiếu nhập cho bạn
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Mã phiếu nhập</th>
                        <th className="px-4 py-2">Mã khách hàng</th>
                        <th className="px-4 py-2">Mã hóa đơn</th>
                        <th className="px-4 py-2">Kho</th>
                        <th className="px-4 py-2">Nhân viên</th>
                        <th className="px-4 py-2">Ngày nhập</th>
                        <th className="px-4 py-2">Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {receiptBasic.map((receipt) => (
                        <tr
                            key={receipt.receipt_id}
                            className="even:bg-gray-100"
                        >
                            <td className="px-4 py-2">{receipt.receipt_id}</td>
                            <td className="px-4 py-2">{receipt.customer_id}</td>
                            <td className="px-4 py-2">{receipt.invoice_id}</td>
                            <td className="px-4 py-2">
                                {receipt.warehouse_name}
                            </td>
                            <td className="px-4 py-2">
                                {receipt.employee_first_name +
                                    " " +
                                    receipt.employee_last_name}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(receipt.receipt_date)}
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="font-semibold text-green-600 hover:text-green-500"
                                    onClick={() =>
                                        popup({
                                            importRefunded:
                                                receipt.receipt_id.toString(),
                                            mode: "detail",
                                        })
                                    }
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {receiptBasic.length > 0 && (
                <div className="text-center">
                    <div className="inline-flex">
                        <Button
                            text="Xem thêm"
                            textSize="small"
                            type="small"
                            onClick={handleLoadMore}
                            disabled={!hasMore}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReceiptRefundedTable;
