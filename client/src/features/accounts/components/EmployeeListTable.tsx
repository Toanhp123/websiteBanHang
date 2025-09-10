import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useEffect, useState } from "react";
import type { Employee } from "../types/accounts.type";
import { deleteEmployee, getAllEmployee } from "../services/account.api";
import { getRole } from "@/stores/authStore";

function EmployeeListTable({ id, popup }: EditPopupPros) {
    const [editMenu, setEditMenu] = useState<number | null>(null);
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [reload, setReload] = useState(false);

    const handleGetAllEmployee = async () => {
        try {
            const res = await getAllEmployee();

            if (res) {
                setEmployee(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditMenu = (invoice_id: number) => {
        setEditMenu((prev) => (prev === invoice_id ? null : invoice_id));
    };

    const handleDeleteEmployee = async (employee_id: number) => {
        try {
            const res = await deleteEmployee(employee_id);

            if (res) {
                console.log(res.message);

                setReload(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllEmployee();
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
                    We found {employee.length} employee for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            {employee.length > 0 && (
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Position</th>
                            {getRole() === "Admin" && (
                                <th className="p-2 text-right">Action</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {employee.map((item) => (
                            <tr
                                key={item.employee_id}
                                className="even:bg-gray-100"
                            >
                                <td className="p-2">{item.employee_id}</td>
                                <td className="p-2">
                                    {item.employee_first_name +
                                        " " +
                                        item.employee_last_name}
                                </td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2">{item.employee_phone}</td>
                                <td className="p-2">
                                    {item.employee_position_name}
                                </td>
                                {getRole() === "Admin" && (
                                    <td className="p-2 text-right">
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    handleOpenEditMenu(
                                                        item.employee_id,
                                                    )
                                                }
                                                className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                            >
                                                <i className="fa-solid fa-ellipsis"></i>
                                            </button>

                                            {editMenu === item.employee_id && (
                                                <div className="shadow-light absolute top-8 right-0 z-50 h-35 w-50 rounded-2xl bg-white">
                                                    <div className="flex h-full w-full flex-col px-4 py-2">
                                                        <button
                                                            className="text-main-primary disabled:text-disable hover:text-main-secondary flex flex-1 items-center rounded-2xl px-3 font-semibold hover:cursor-pointer hover:bg-gray-300"
                                                            onClick={() =>
                                                                popup(
                                                                    "employee",
                                                                    item.employee_id.toString(),
                                                                )
                                                            }
                                                        >
                                                            Edit Employee
                                                        </button>

                                                        <button
                                                            className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-red-600 hover:cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                                            onClick={() =>
                                                                handleDeleteEmployee(
                                                                    item.employee_id,
                                                                )
                                                            }
                                                        >
                                                            Delete Employee
                                                        </button>

                                                        <button
                                                            className="flex flex-1 items-center rounded-2xl px-3 font-semibold text-pink-600 hover:cursor-pointer hover:bg-gray-300 hover:text-pink-500"
                                                            onClick={() =>
                                                                popup(
                                                                    "employee",
                                                                    item.employee_id.toString() +
                                                                        "Detail",
                                                                )
                                                            }
                                                        >
                                                            Detail Employee
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeListTable;
