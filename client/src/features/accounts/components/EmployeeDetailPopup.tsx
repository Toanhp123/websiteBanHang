import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useEffect, useState } from "react";
import { getEmployeeDetail } from "../services/account.api";
import { InputForDashboard } from "@/components/shared";

function EmployeeDetailPopup({ id, popup }: EditPopupPros) {
    const [employeeFirstName, setEmployeeFirstName] = useState<string>("");
    const [employeeLastName, setEmployeeLastName] = useState<string>("");
    const [employeePhone, setEmployeePhone] = useState<string>("");
    const [employeeBirthDay, setEmployeeBirthDay] = useState<string>("");
    const [employeeEmail, setEmployeeEmail] = useState<string>("");
    const [employeeLocation, setEmployeeLocation] = useState<string>("");
    const [accountPosition, setAccountPosition] = useState<string>("");
    const [employeeHireDate, setEmployeeHireDate] = useState<string>("");

    const handleGetEmployeeDetail = async (employee_id: number) => {
        try {
            const res = await getEmployeeDetail(employee_id);

            console.log(res);

            if (res) {
                setEmployeeFirstName(res.employee_first_name);
                setEmployeeLastName(res.employee_last_name);
                setEmployeePhone(res.employee_phone);
                setEmployeeBirthDay(res.employee_birthday);
                setEmployeeEmail(res.email);
                setEmployeeLocation(res.employee_address);
                setAccountPosition(res.employee_position_name);
                setEmployeeHireDate(res.employee_hire_date);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetEmployeeDetail(Number(id));
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Edit Product</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("employee", "")}
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
                                value={employeeFirstName}
                                readOnly={true}
                                setValue={setEmployeeFirstName}
                            />
                            <InputForDashboard
                                label="Last Name"
                                placeholder="Text Here"
                                value={employeeLastName}
                                readOnly={true}
                                setValue={setEmployeeLastName}
                            />
                            <InputForDashboard
                                type="number"
                                label="Phone Number"
                                placeholder="Text Here"
                                value={employeePhone}
                                readOnly={true}
                                setValue={setEmployeePhone}
                            />
                            <InputForDashboard
                                type="date"
                                label="Birth Day"
                                value={employeeBirthDay}
                                readOnly={true}
                                setValue={setEmployeeBirthDay}
                            />
                        </div>

                        <InputForDashboard
                            label="Location"
                            placeholder="Text Here"
                            value={employeeLocation}
                            readOnly={true}
                            setValue={setEmployeeLocation}
                        />
                    </div>

                    <div>
                        {/* Advance Info */}
                        <div className="shadow-light space-y-4 rounded-2xl p-4">
                            <h1 className="font-semibold">More Info</h1>

                            <InputForDashboard
                                label="Email"
                                placeholder="Text Here"
                                value={employeeEmail}
                                readOnly={true}
                                setValue={setEmployeeEmail}
                            />
                            <InputForDashboard
                                label="Position"
                                placeholder="Text Here"
                                value={accountPosition}
                                readOnly={true}
                                setValue={setAccountPosition}
                            />
                            <InputForDashboard
                                label="Hire Date"
                                placeholder="Text Here"
                                value={employeeHireDate}
                                setValue={setEmployeeHireDate}
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
