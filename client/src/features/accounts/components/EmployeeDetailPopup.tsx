import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useEffect, useState } from "react";
import { getEmployeeDetail } from "../services/account.api";
import { InputForDashboard } from "@/components/shared";
import type { Employee } from "../types/accounts.type";
import Loading from "@/features/loading/components/Loading";

function EmployeeDetailPopup({ id, popup }: EditPopupPros) {
    const [employee, setEmployee] = useState<Employee | null>(null);

    const handleGetEmployeeDetail = async (employee_id: number) => {
        try {
            const res = await getEmployeeDetail(employee_id);

            if (res) {
                setEmployee(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetEmployeeDetail(Number(id));
        }
    }, [id]);

    if (!employee) return <Loading />;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Edit Product</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() =>
                            popup({
                                employee: "",
                                mode: "",
                            })
                        }
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="grid max-h-[60vh] grid-cols-2 gap-6 overflow-y-auto p-2">
                    {/* Basic Info */}
                    <div className="shadow-light space-y-4 rounded-2xl p-4">
                        <h1 className="font-semibold">Employee Info</h1>

                        <div className="grid grid-cols-2 gap-4">
                            <InputForDashboard
                                label="First Name"
                                placeholder="Text Here"
                                value={employee.employee_first_name}
                                readOnly={true}
                            />
                            <InputForDashboard
                                label="Last Name"
                                placeholder="Text Here"
                                value={employee.employee_last_name}
                                readOnly={true}
                            />
                            <InputForDashboard
                                type="number"
                                label="Phone Number"
                                placeholder="Text Here"
                                value={employee.employee_phone}
                                readOnly={true}
                            />
                            <InputForDashboard
                                type="date"
                                label="Birth Day"
                                value={employee.employee_birthday}
                                readOnly={true}
                            />
                        </div>

                        <InputForDashboard
                            label="Location"
                            placeholder="Text Here"
                            value={employee.employee_address}
                            readOnly={true}
                        />
                    </div>

                    <div>
                        {/* Advance Info */}
                        <div className="shadow-light space-y-4 rounded-2xl p-4">
                            <h1 className="font-semibold">More Info</h1>

                            <InputForDashboard
                                label="Email"
                                placeholder="Text Here"
                                value={employee.email}
                                readOnly={true}
                            />
                            <InputForDashboard
                                label="Position"
                                placeholder="Text Here"
                                value={employee.employee_position_name}
                                readOnly={true}
                            />
                            <InputForDashboard
                                label="Hire Date"
                                placeholder="Text Here"
                                value={employee.employee_hire_date}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetailPopup;
