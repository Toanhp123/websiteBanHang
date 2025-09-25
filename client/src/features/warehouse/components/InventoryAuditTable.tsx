import { Button } from "@/components/shared";
import type { InventoryAuditBasicInfo } from "../types/warehouse.type";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { getInventoryAuditBasicInfo } from "../services/warehouse.api";

function InventoryAuditTable() {
    const [exportBasic, setExportBasic] = useState<InventoryAuditBasicInfo[]>(
        [],
    );
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleFormatActionInventoryAudit = (action: string) => {
        switch (action) {
            case "import":
                return "Nhập hàng";
            case "invoice_paid":
                return "Hóa đơn đã thanh toán";
            default:
                return action;
        }
    };

    useEffect(() => {
        const handleGetReceiptBasicInfo = async () => {
            try {
                const res = await getInventoryAuditBasicInfo(5, page);

                setExportBasic((prev) => {
                    const merged = [...prev, ...res.inventoryAuditList];
                    const map = new Map(
                        merged.map((item) => [item.audit_id, item]),
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
                    Đã tìm thấy {exportBasic.length} mục cho bạn
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Mã kiểm kê</th>
                        <th className="px-4 py-2">Tên nhân viên</th>
                        <th className="px-4 py-2">Tên sản phẩm</th>
                        <th className="px-4 py-2">Số lượng cũ</th>
                        <th className="px-4 py-2">Số lượng mới</th>
                        <th className="px-4 py-2">Mức thay đổi</th>
                        <th className="px-4 py-2">Tên kho</th>
                        <th className="px-4 py-2">Hành động</th>
                        <th className="px-4 py-2">Ngày kiểm kê</th>
                    </tr>
                </thead>

                <tbody>
                    {exportBasic.map((items) => (
                        <tr key={items.audit_id} className="even:bg-gray-100">
                            <td className="px-4 py-2">{items.audit_id}</td>
                            <td className="px-4 py-2">
                                {items.employee_first_name +
                                    " " +
                                    items.employee_last_name}
                            </td>
                            <td className="px-4 py-2">{items.product_name}</td>
                            <td className="px-4 py-2">{items.old_quantity}</td>
                            <td className="px-4 py-2">{items.new_quantity}</td>
                            <td className="px-4 py-2">{items.change_amount}</td>
                            <td className="px-4 py-2">
                                {items.warehouse_name}
                            </td>
                            <td className="px-4 py-2">
                                {handleFormatActionInventoryAudit(items.action)}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(items.audit_date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {exportBasic.length > 0 && (
                <div className="text-center">
                    <div className="inline-flex">
                        <Button
                            text="Tải thêm"
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

export default InventoryAuditTable;
