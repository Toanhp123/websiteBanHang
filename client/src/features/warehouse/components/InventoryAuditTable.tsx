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
                return "Import";
            case "invoice_paid":
                return "Invoice Paid";
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
                    We found {exportBasic.length} items for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Audit ID</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Old Quantity</th>
                        <th className="px-4 py-2">New Quantity</th>
                        <th className="px-4 py-2">Change Amount</th>
                        <th className="px-4 py-2">Warehouse Name</th>
                        <th className="px-4 py-2">Action</th>
                        <th className="px-4 py-2">Audit Date</th>
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
                            text="Load More"
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
