import { Dropdown, InputForDashboard } from "@/components/shared";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useEffect, useState } from "react";
import { getDetailEmployee, updateEmployee } from "../services/account.api";
import { useGetAllPositionEmployee } from "@/hooks/useGetAllPositionEmployee";

function EditEmployeePopup({ id, popup }: EditPopupPros) {
    const allPositionEmployee = useGetAllPositionEmployee();

    const [originalData, setOriginalData] = useState<unknown>(null);
    const [employeeFirstName, setEmployeeFirstName] = useState<string>("");
    const [employeeLastName, setEmployeeLastName] = useState<string>("");
    const [employeePhone, setEmployeePhone] = useState<string>("");
    const [employeeBirthDay, setEmployeeBirthDay] = useState<string>("");
    const [employeeEmail, setEmployeeEmail] = useState<string>("");
    const [employeeLocation, setEmployeeLocation] = useState<string>("");
    const [accountUsername, setAccountUsername] = useState<string>("");
    const [accountPassword, setAccountPassword] = useState<string>("");
    const [accountPositionID, setAccountPositionID] = useState<string>("");

    const currentData = {
        employee_first_name: employeeFirstName,
        employee_last_name: employeeLastName,
        employee_phone: employeePhone,
        email: employeeEmail,
        username: accountUsername,
        employee_address: employeeLocation,
        employee_birthday: employeeBirthDay,
        employee_position_id: accountPositionID,
        password: accountPassword,
    };

    const isChanged =
        originalData &&
        JSON.stringify(originalData) !== JSON.stringify(currentData);

    const formatDataPositionEmployee =
        allPositionEmployee?.map((position) => ({
            id: position.employee_position_id,
            name: position.employee_position_name,
        })) || [];

    const handleGetEmployeeDetail = async (employee_id: number) => {
        try {
            const res = await getDetailEmployee(employee_id);

            const data = {
                employee_first_name: res.employee_first_name,
                employee_last_name: res.employee_last_name,
                employee_phone: res.employee_phone,
                email: res.email,
                username: res.username,
                employee_address: res.employee_address,
                employee_birthday: res.employee_birthday,
                employee_position_id:
                    formatDataPositionEmployee
                        .find(
                            (item) => item.name === res.employee_position_name,
                        )
                        ?.id.toString() || "",
                password: "",
            };

            setEmployeeFirstName(res.employee_first_name);
            setEmployeeLastName(res.employee_last_name);
            setEmployeePhone(res.employee_phone);
            setEmployeeEmail(res.email);
            setAccountUsername(res.username);
            setEmployeeLocation(res.employee_address);
            setEmployeeBirthDay(res.employee_birthday);

            if (allPositionEmployee) {
                setAccountPositionID(
                    formatDataPositionEmployee
                        .find(
                            (item) => item.name === res.employee_position_name,
                        )
                        ?.id.toString() || "",
                );
            }

            setOriginalData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getChangedFields = () => {
        if (!originalData) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(currentData).forEach(([key, value]) => {
            if ((originalData as unknown)[key] !== value) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handelSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const changes = getChangedFields();

        try {
            await updateEmployee(Number(id), changes);

            popup("employee", "");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetEmployeeDetail(Number(id));
        }
    }, [allPositionEmployee]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                onSubmit={(e) => handelSaveEdit(e)}
            >
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
                    <div>
                        {/* Basic Info */}
                        <div className="shadow-light space-y-4 rounded-2xl p-4">
                            <h1 className="font-semibold">Employee Info</h1>

                            <div className="grid grid-cols-2 gap-4">
                                <InputForDashboard
                                    label="First Name"
                                    placeholder="Text Here"
                                    value={employeeFirstName}
                                    setValue={setEmployeeFirstName}
                                />
                                <InputForDashboard
                                    label="Last Name"
                                    placeholder="Text Here"
                                    value={employeeLastName}
                                    setValue={setEmployeeLastName}
                                />
                                <InputForDashboard
                                    type="number"
                                    label="Phone Number"
                                    placeholder="Text Here"
                                    value={employeePhone}
                                    setValue={setEmployeePhone}
                                />
                                <InputForDashboard
                                    type="date"
                                    label="Birth Day"
                                    value={employeeBirthDay}
                                    setValue={setEmployeeBirthDay}
                                />
                            </div>

                            <InputForDashboard
                                label="Location"
                                placeholder="Text Here"
                                value={employeeLocation}
                                setValue={setEmployeeLocation}
                            />
                        </div>
                    </div>

                    <div>
                        {/* Advance Info */}
                        <div className="shadow-light space-y-4 rounded-2xl p-4">
                            <h1 className="font-semibold">Account Info</h1>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputForDashboard
                                        label="Username"
                                        placeholder="Text Here"
                                        value={accountUsername}
                                        setValue={setAccountUsername}
                                    />
                                    <Dropdown
                                        text="Position"
                                        options={formatDataPositionEmployee}
                                        value={accountPositionID}
                                        setValue={setAccountPositionID}
                                    />
                                </div>

                                <InputForDashboard
                                    type="password"
                                    label="New Password"
                                    placeholder="Text Here"
                                    value={accountPassword}
                                    setValue={setAccountPassword}
                                    required={false}
                                />
                                <InputForDashboard
                                    label="Email"
                                    placeholder="Text Here"
                                    value={employeeEmail}
                                    setValue={setEmployeeEmail}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                        onClick={() => popup("employee", "")}
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white disabled:bg-gray-500"
                        disabled={!isChanged}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEmployeePopup;
