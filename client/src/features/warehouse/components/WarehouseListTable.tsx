import { useEffect, useState } from "react";
import type { EditPopupPros, Warehouse } from "../types/warehouse.type";
import { deleteWarehouse, getAllWarehouse } from "../services/warehouse.api";
import { useNavigate } from "react-router-dom";

function WarehouseListTable({ id, popup }: EditPopupPros) {
    const navigate = useNavigate();
    const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
    const [editMenu, setEditMenu] = useState<number | null>(null);
    const [reload, setReload] = useState(false);

    const handleGetAllWarehouse = async () => {
        try {
            const res = await getAllWarehouse();

            setWarehouseList(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditMenu = (warehouse_id: number) => {
        setEditMenu((prev) => (prev === warehouse_id ? null : warehouse_id));
    };

    const handleDeleteWarehouse = async (warehouse_id: number) => {
        try {
            const res = await deleteWarehouse(warehouse_id);

            if (res) {
                setReload(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllWarehouse();
    }, [id, reload]);

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
                    Tìm thấy {warehouseList.length} kết quả cho bạn
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Tên kho</th>
                        <th className="px-4 py-2">Địa điểm</th>
                        <th className="px-4 py-2">Độ ưu tiên</th>
                        <th className="px-4 py-2">Tên nhân viên</th>
                        <th className="px-4 py-2 text-center">Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {warehouseList.map((warehouse) => (
                        <tr
                            key={warehouse.warehouse_id}
                            className="even:bg-gray-100"
                        >
                            <td className="px-4 py-2">
                                {warehouse.warehouse_id}
                            </td>
                            <td className="px-4 py-2">
                                {warehouse.warehouse_name}
                            </td>
                            <td className="px-4 py-2">{warehouse.location}</td>
                            <td className="px-4 py-2">{warehouse.priority}</td>
                            <td className="px-4 py-2">
                                {warehouse.employee_first_name +
                                    " " +
                                    warehouse.employee_last_name}
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            handleOpenEditMenu(
                                                warehouse.warehouse_id,
                                            )
                                        }
                                        className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {editMenu === warehouse.warehouse_id && (
                                        <div className="shadow-light absolute top-8 right-0 z-50 h-35 w-50 rounded-2xl bg-white">
                                            <div className="flex h-full w-full flex-col px-4 py-2">
                                                <button
                                                    className="text-main-primary hover:text-main-secondary flex flex-1 items-center rounded-2xl px-3 font-semibold hover:cursor-pointer hover:bg-gray-300"
                                                    onClick={() =>
                                                        popup({
                                                            warehouse:
                                                                warehouse.warehouse_id.toString(),
                                                            mode: "edit",
                                                        })
                                                    }
                                                >
                                                    Chỉnh sửa
                                                </button>

                                                <button
                                                    className="flex flex-1 items-center rounded-2xl px-3 font-semibold text-red-600 hover:cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                                    onClick={() =>
                                                        handleDeleteWarehouse(
                                                            warehouse.warehouse_id,
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </button>

                                                <button
                                                    className="flex flex-1 items-center rounded-2xl px-3 font-semibold text-pink-600 hover:cursor-pointer hover:bg-gray-300 hover:text-pink-500"
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/inventory/${warehouse.warehouse_id}`,
                                                        )
                                                    }
                                                >
                                                    Chi tiết
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
        </div>
    );
}

export default WarehouseListTable;
