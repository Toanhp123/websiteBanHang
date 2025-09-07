import { useEffect, useState } from "react";
import type { EditPopupPros, ExportDetail } from "../types/warehouse.type";
import { getExportDetail } from "../services/warehouse.api";

function ExportDetailPopup({ id, popup }: EditPopupPros) {
    const [exportDetail, setExportDetail] = useState<ExportDetail[]>([]);

    const handleGetReceiptDetail = async (receipt_id: number) => {
        try {
            const res = await getExportDetail(receipt_id);

            setExportDetail(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetReceiptDetail(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Export Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("export", "")}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="shadow-light max-h-[50vh] gap-6 overflow-y-auto rounded-2xl p-4">
                    <table className="w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="px-4 py-2">Code</th>
                                <th className="px-4 py-2">Product ID</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Warehouse ID</th>
                                <th className="px-4 py-2">Warehouse Name</th>
                                <th className="px-4 py-2">
                                    Warehouse Location
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {exportDetail.map((item) => (
                                <tr key={item.product_id}>
                                    <td className="px-4 py-2">
                                        {item.product_code}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.product_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.product_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.warehouse_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.warehouse_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.location}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default ExportDetailPopup;
