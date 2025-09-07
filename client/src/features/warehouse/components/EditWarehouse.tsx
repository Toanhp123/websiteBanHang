import { useEffect, useState } from "react";
import type { EditPopupPros } from "../types/warehouse.type";
import { editWarehouse, getWarehouseByID } from "../services/warehouse.api";
import { Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllEmployee } from "@/hooks/useGetAllEmployee";

function EditWarehouse({ id, popup }: EditPopupPros) {
    const allEmployee = useGetAllEmployee();

    const [warehouseName, setWarehouseName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [employeeID, setEmployeeID] = useState("");

    const formatDataEmployee =
        allEmployee?.map((employee) => ({
            id: employee.employee_id,
            name:
                employee.employee_first_name +
                " " +
                employee.employee_last_name,
        })) || [];

    const handleGetAllWarehouse = async (warehouse_id: number) => {
        try {
            const res = await getWarehouseByID(warehouse_id);

            setWarehouseName(res.warehouse_name);
            setLocation(res.location);
            setPriority(res.priority.toString());
            setEmployeeID(res.employee_id.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveEditWarehouse = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const UpdateWarehouseData = {
            warehouse_id: id,
            warehouse_name: warehouseName,
            location,
            priority: Number(priority),
            employee_id: Number(employeeID),
        };

        try {
            const res = await editWarehouse(UpdateWarehouseData);

            if (res.success) {
                console.log(res.message);

                popup("warehouse", "");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetAllWarehouse(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
                onSubmit={(e) => handleSaveEditWarehouse(e)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Export Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("warehouse", "")}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                        <InputForDashboard
                            label="Warehouse Name"
                            placeholder="Type Here"
                            value={warehouseName}
                            setValue={setWarehouseName}
                        />

                        <InputForDashboard
                            name="warehouse_priority"
                            type="number"
                            label="Warehouse Priority"
                            placeholder="0"
                            value={priority}
                            setValue={setPriority}
                        />
                    </div>

                    <InputForDashboard
                        name="location"
                        label="Warehouse Location"
                        placeholder="Type Here"
                        value={location}
                        setValue={setLocation}
                    />

                    <Dropdown
                        text="Employee"
                        options={formatDataEmployee}
                        value={employeeID}
                        setValue={setEmployeeID}
                    />
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                        onClick={() => popup("warehouse", "")}
                    >
                        Cancel
                    </button>

                    <button className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditWarehouse;
