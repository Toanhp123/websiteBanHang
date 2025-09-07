import { Button } from "@/components/shared";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { getExportBasicInfo } from "../services/warehouse.api";
import type { EditPopupPros, ExportBasicInfo } from "../types/warehouse.type";

function ExportTable({ popup }: EditPopupPros) {
    const [exportBasic, setExportBasic] = useState<ExportBasicInfo[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        const handleGetReceiptBasicInfo = async () => {
            try {
                const res = await getExportBasicInfo(5, page);

                setExportBasic((prev) => {
                    const merged = [...prev, ...res.warehouseExportList];
                    const map = new Map(
                        merged.map((item) => [item.export_id, item]),
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
                        <th className="px-4 py-2">Export ID</th>
                        <th className="px-4 py-2">Invoice ID</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Export Date</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {exportBasic.map((items) => (
                        <tr key={items.export_id} className="even:bg-gray-100">
                            <td className="px-4 py-2">{items.export_id}</td>
                            <td className="px-4 py-2">{items.invoice_id}</td>

                            <td className="px-4 py-2">
                                {items.employee_first_name +
                                    " " +
                                    items.employee_last_name}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(items.export_date)}
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="font-semibold text-green-600 hover:text-green-500"
                                    onClick={() =>
                                        popup(
                                            "export",
                                            items.export_id.toString(),
                                        )
                                    }
                                >
                                    Detail
                                </button>
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

export default ExportTable;
