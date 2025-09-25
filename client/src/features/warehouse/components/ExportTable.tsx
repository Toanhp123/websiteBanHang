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
                    Chúng tôi tìm thấy {exportBasic.length} mục cho bạn
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Mã Phiếu Xuất</th>
                        <th className="px-4 py-2">Mã Hóa Đơn</th>
                        <th className="px-4 py-2">Tên Nhân Viên</th>
                        <th className="px-4 py-2">Ngày Xuất</th>
                        <th className="px-4 py-2">Hành động</th>
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
                                        popup({
                                            export: items.export_id.toString(),
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

export default ExportTable;
