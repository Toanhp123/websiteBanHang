import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Inventory } from "../types/warehouse.type";
import { getInventoryInWarehouse } from "../services/warehouse.api";
import { formatDate } from "@/utils/formatDate";

function InventoryListTable() {
    const { warehouse_id } = useParams();
    const [inventory, setInventory] = useState<Inventory[]>([]);

    const handleGetInventory = async (warehouse_id: number) => {
        try {
            const res = await getInventoryInWarehouse(warehouse_id);

            if (res) {
                setInventory(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Number(warehouse_id)) {
            handleGetInventory(Number(warehouse_id));
        }
    }, [warehouse_id]);

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div>
                <p className="font-semibold">
                    Đã tìm thấy {inventory.length} kết quả cho bạn
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Mã sản phẩm</th>
                        <th className="px-4 py-2">Tên sản phẩm</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2">Số lượng</th>
                        <th className="px-4 py-2">Lần kiểm tra cuối</th>
                    </tr>
                </thead>

                <tbody>
                    {inventory.map((item) => (
                        <tr
                            key={item.product_code}
                            className="even:bg-gray-100"
                        >
                            <td className="px-4 py-2">{item.product_code}</td>
                            <td className="px-4 py-2">{item.product_name}</td>
                            <td className="px-4 py-2">
                                {item.product_status_name}
                            </td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">
                                {formatDate(item.last_checked_at)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryListTable;
