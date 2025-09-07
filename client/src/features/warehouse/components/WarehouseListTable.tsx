import { useEffect, useState } from "react";
import type { EditPopupPros, Warehouse } from "../types/warehouse.type";
import { deleteWarehouse, getAllWarehouse } from "../services/warehouse.api";

function WarehouseListTable({ id, popup }: EditPopupPros) {
    const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);

    const handleGetAllWarehouse = async () => {
        try {
            const res = await getAllWarehouse();

            setWarehouseList(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteWarehouse = async (warehouse_id: number) => {
        try {
            // TODO: có thể làm sau vì khá lằng nhằng
            await deleteWarehouse(warehouse_id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllWarehouse();
    }, [id]);

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div>
                <p className="font-semibold">
                    We found {warehouseList.length} result for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Warehouse Name</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Priority</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2 text-center">Action</th>
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
                                <div className="flex w-full items-center justify-center gap-4">
                                    <button
                                        className="font-semibold text-green-600 hover:text-green-500"
                                        onClick={() =>
                                            popup(
                                                "warehouse",
                                                warehouse.warehouse_id.toString(),
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="font-semibold text-red-600 hover:text-red-500"
                                        onClick={() =>
                                            handleDeleteWarehouse(
                                                warehouse.warehouse_id,
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
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
