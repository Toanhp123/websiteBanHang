import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllPositionEmployee } from "@/hooks/useGetAllPositionEmployee";
import { useState } from "react";
import { addEmployee } from "../services/account.api";
import { useNavigate } from "react-router-dom";

function AddEmployeeForm() {
    const allPositionEmployee = useGetAllPositionEmployee();
    const navigate = useNavigate();

    const [employeeFirstName, setEmployeeFirstName] = useState<string>("");
    const [employeeLastName, setEmployeeLastName] = useState<string>("");
    const [employeePhone, setEmployeePhone] = useState<string>("");
    const [employeeBirthDay, setEmployeeBirthDay] = useState<string>("");
    const [employeeEmail, setEmployeeEmail] = useState<string>("");
    const [employeeLocation, setEmployeeLocation] = useState<string>("");
    const [accountUsername, setAccountUsername] = useState<string>("");
    const [accountPassword, setAccountPassword] = useState<string>("");
    const [accountPositionID, setAccountPositionID] = useState<string>("");

    const formatDataPositionEmployee =
        allPositionEmployee?.map((position) => ({
            id: position.employee_position_id,
            name: position.employee_position_name,
        })) || [];

    const handleAddEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
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

        try {
            const res = await addEmployee(data);

            if (res.success) {
                console.log(res.message);

                navigate("/dashboard/employeeList");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className="grid grid-cols-5 gap-6"
            onSubmit={(e) => handleAddEmployee(e)}
        >
            <div className="col-span-3 space-y-6">
                {/* Basic Info */}
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Basic Info</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <InputForDashboard
                            label="First Name"
                            placeholder="Type Here"
                            value={employeeFirstName}
                            setValue={setEmployeeFirstName}
                        />
                        <InputForDashboard
                            label="Last Name"
                            placeholder="Type Here"
                            value={employeeLastName}
                            setValue={setEmployeeLastName}
                        />
                        <InputForDashboard
                            type="number"
                            label="Phone Number"
                            placeholder="Type Here"
                            value={employeePhone}
                            setValue={setEmployeePhone}
                        />
                        <InputForDashboard
                            type="date"
                            label="Birth Day"
                            placeholder="Type Here"
                            value={employeeBirthDay}
                            setValue={setEmployeeBirthDay}
                        />
                    </div>

                    <InputForDashboard
                        label="Location"
                        placeholder="Type Here"
                        value={employeeLocation}
                        setValue={setEmployeeLocation}
                    />
                    <InputForDashboard
                        label="Email Address"
                        placeholder="Type Here"
                        value={employeeEmail}
                        setValue={setEmployeeEmail}
                    />
                </div>
            </div>

            <div className="col-span-2 space-y-6">
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <div>
                        <h1 className="text-xl font-semibold">Account Info</h1>
                        <div className="mt-4 border-b border-gray-300"></div>
                    </div>

                    <InputForDashboard
                        label="Username"
                        placeholder="Type Here"
                        value={accountUsername}
                        setValue={setAccountUsername}
                    />
                    <InputForDashboard
                        label="Password"
                        placeholder="Type Here"
                        value={accountPassword}
                        setValue={setAccountPassword}
                    />
                    <Dropdown
                        text="Position"
                        options={formatDataPositionEmployee}
                        value={accountPositionID}
                        setValue={setAccountPositionID}
                    />
                </div>

                <div className="inline-flex">
                    <Button text="Add product" textSize="small" />
                </div>
            </div>
        </form>
    );
}

export default AddEmployeeForm;
