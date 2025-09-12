import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllPositionEmployee } from "@/hooks/useGetAllPositionEmployee";
import { addEmployee } from "../services/account.api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    addEmployeeSchema,
    type AddEmployeeFormInputs,
} from "../validations/addEmployee.schema";

function AddEmployeeForm() {
    const allPositionEmployee = useGetAllPositionEmployee();
    const navigate = useNavigate();

    const formatDataPositionEmployee =
        allPositionEmployee?.map((position) => ({
            id: position.employee_position_id,
            name: position.employee_position_name,
        })) || [];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddEmployeeFormInputs>({
        resolver: yupResolver(addEmployeeSchema),
    });

    const onSubmit = async (data: AddEmployeeFormInputs) => {
        try {
            const res = await addEmployee({
                employee_first_name: data.employeeFirstName,
                employee_last_name: data.employeeLastName,
                employee_phone: data.employeePhone,
                email: data.employeeEmail,
                username: data.accountUsername,
                employee_address: data.employeeLocation,
                employee_birthday: data.employeeBirthDay,
                employee_position_id: data.accountPositionID,
                password: data.accountPassword,
            });
            if (res.success) {
                navigate("/dashboard/employeeList");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className="grid grid-cols-5 gap-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="col-span-3 space-y-6">
                {/* Basic Info */}
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <h1 className="text-xl font-semibold">Basic Info</h1>

                    <div className="grid grid-cols-2 gap-8">
                        <InputForDashboard
                            label="First Name"
                            placeholder="Type Here"
                            register={register("employeeFirstName")}
                            error={errors.employeeFirstName?.message}
                        />

                        <InputForDashboard
                            label="Last Name"
                            placeholder="Type Here"
                            register={register("employeeLastName")}
                            error={errors.employeeLastName?.message}
                        />

                        <InputForDashboard
                            type="number"
                            label="Phone Number"
                            placeholder="Type Here"
                            register={register("employeePhone")}
                            error={errors.employeePhone?.message}
                        />

                        <InputForDashboard
                            type="date"
                            label="Birth Day"
                            register={register("employeeBirthDay")}
                            error={errors.employeeBirthDay?.message}
                        />
                    </div>

                    <InputForDashboard
                        label="Location"
                        placeholder="Type Here"
                        register={register("employeeLocation")}
                        error={errors.employeeLocation?.message}
                    />

                    <InputForDashboard
                        label="Email Address"
                        placeholder="Type Here"
                        register={register("employeeEmail")}
                        error={errors.employeeEmail?.message}
                    />
                </div>
            </div>

            <div className="col-span-2 space-y-6">
                <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                    <h1 className="text-xl font-semibold">Account Info</h1>

                    <InputForDashboard
                        label="Username"
                        placeholder="Type Here"
                        register={register("accountUsername")}
                        error={errors.accountUsername?.message}
                    />

                    <InputForDashboard
                        label="Password"
                        type="password"
                        placeholder="Type Here"
                        register={register("accountPassword")}
                        error={errors.accountPassword?.message}
                    />

                    <Dropdown
                        text="Position"
                        options={formatDataPositionEmployee}
                        register={register("accountPositionID")}
                        error={errors.accountPositionID?.message}
                    />
                </div>

                <div className="inline-flex">
                    <Button text="Add Employee" textSize="small" />
                </div>
            </div>
        </form>
    );
}

export default AddEmployeeForm;
