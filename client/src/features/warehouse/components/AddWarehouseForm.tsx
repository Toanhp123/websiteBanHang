import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllEmployee } from "@/hooks/useGetAllEmployee";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWarehouse } from "../services/warehouse.api";

function AddWarehouseForm() {
    const allEmployee = useGetAllEmployee();
    const navigate = useNavigate();

    const [warehouseName, setWarehouseName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [employeeID, setEmployeeID] = useState<string>("");

    const formatDataEmployee =
        allEmployee?.map((employee) => ({
            id: employee.employee_id,
            name:
                employee.employee_first_name +
                " " +
                employee.employee_last_name,
        })) || [];

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const WarehouseInfo = {
            warehouseName,
            location,
            priority,
            employeeID,
        };

        try {
            const res = await addWarehouse(WarehouseInfo);

            if (res.success) {
                navigate("/dashboard/warehouseList");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-2/3 rounded-2xl bg-white">
            <form
                className="space-y-8 px-8 py-6"
                onSubmit={(e) => handleSubmitForm(e)}
            >
                <div className="grid grid-cols-2 gap-8">
                    <InputForDashboard
                        label="Warehouse Name"
                        value={warehouseName}
                        placeholder="Type Here"
                        setValue={setWarehouseName}
                    />
                    <InputForDashboard
                        label="Warehouse Location"
                        placeholder="Type Here"
                        value={location}
                        setValue={setLocation}
                    />
                    <InputForDashboard
                        label="Warehouse Priority"
                        type="number"
                        placeholder="0"
                        value={priority}
                        setValue={setPriority}
                    />
                    <Dropdown
                        text="Employee"
                        options={formatDataEmployee}
                        value={employeeID}
                        setValue={setEmployeeID}
                    />
                </div>

                <div className="inline-flex">
                    <Button text="Add Warehouse" textSize="small" />
                </div>
            </form>
        </div>
    );
}

export default AddWarehouseForm;
