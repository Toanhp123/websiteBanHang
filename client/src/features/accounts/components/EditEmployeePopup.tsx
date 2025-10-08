import { Dropdown, InputForDashboard } from "@/components/shared";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import { useEffect, useState } from "react";
import {
    getDetailEmployeeAndAccount,
    updateEmployee,
} from "../services/account.api";
import { useGetAllPositionEmployee } from "@/hooks/useGetAllPositionEmployee";
import { useForm } from "react-hook-form";
import {
    editEmployeeSchema,
    type EditEmployeeFormInputs,
} from "../validations/editEmployee.schema";
import { yupResolver } from "@hookform/resolvers/yup";

function EditEmployeePopup({ id, popup }: EditPopupPros) {
    const allPositionEmployee = useGetAllPositionEmployee();

    const [originalData, setOriginalData] = useState<unknown>(null);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EditEmployeeFormInputs>({
        // @ts-expect-error yup type mismatch
        resolver: yupResolver(editEmployeeSchema),
        defaultValues: {
            employee_first_name: "",
            employee_last_name: "",
            employee_phone: "",
            email: "",
            username: "",
            employee_address: "",
            employee_birthday: "",
            employee_position_id: "",
        },
    });

    const currentData = watch();

    const isChanged =
        originalData &&
        JSON.stringify(originalData) !== JSON.stringify(currentData);

    const formatDataPositionEmployee =
        allPositionEmployee?.map((position) => ({
            id: position.employee_position_id,
            name: position.employee_position_name,
        })) || [];

    const handleGetEmployeeDetailAndAccount = async (employee_id: number) => {
        try {
            const res = await getDetailEmployeeAndAccount(employee_id);

            const data = {
                employee_first_name: res.employee_first_name,
                employee_last_name: res.employee_last_name,
                employee_phone: res.employee_phone,
                email: res.email,
                username: res.username,
                employee_address: res.employee_address,
                employee_birthday: res.employee_birthday,
                employee_position_id:
                    allPositionEmployee
                        ?.find(
                            (p) =>
                                p.employee_position_name ===
                                res.employee_position_name,
                        )
                        ?.employee_position_id.toString() || "",
                password: null,
            };

            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof EditEmployeeFormInputs, value);
            });

            setOriginalData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getChangedFields = (data: EditEmployeeFormInputs) => {
        if (!originalData) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(data).forEach(([key, value]) => {
            if ((originalData as Record<string, unknown>)[key] !== value) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handelSaveEdit = async (data: EditEmployeeFormInputs) => {
        const changes = getChangedFields(data);

        try {
            await updateEmployee(Number(id), changes);

            popup({ employee: "", mode: "" });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetEmployeeDetailAndAccount(Number(id));
        }
    }, [allPositionEmployee]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                // @ts-expect-error yup type mismatch
                onSubmit={handleSubmit(handelSaveEdit)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Edit Product</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup({ employee: "", mode: "" })}
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
                                    register={register("employee_first_name")}
                                    error={errors.employee_first_name?.message}
                                />
                                <InputForDashboard
                                    label="Last Name"
                                    register={register("employee_last_name")}
                                    placeholder="Text Here"
                                    error={errors.employee_last_name?.message}
                                />
                                <InputForDashboard
                                    type="number"
                                    label="Phone Number"
                                    register={register("employee_phone")}
                                    placeholder="Text Here"
                                    error={errors.employee_phone?.message}
                                />
                                <InputForDashboard
                                    type="date"
                                    register={register("employee_birthday")}
                                    error={errors.employee_birthday?.message}
                                    label="Birth Day"
                                />
                            </div>

                            <InputForDashboard
                                label="Location"
                                register={register("employee_address")}
                                error={errors.employee_address?.message}
                                placeholder="Text Here"
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
                                        register={register("username")}
                                        error={errors.username?.message}
                                    />
                                    <Dropdown
                                        text="Position"
                                        options={formatDataPositionEmployee}
                                        register={register(
                                            "employee_position_id",
                                        )}
                                        error={
                                            errors.employee_position_id?.message
                                        }
                                    />
                                </div>

                                <InputForDashboard
                                    type="password"
                                    label="New Password"
                                    placeholder="Text Here"
                                    register={register("password")}
                                    error={errors.password?.message}
                                />
                                <InputForDashboard
                                    label="Email"
                                    placeholder="Text Here"
                                    register={register("email")}
                                    error={errors.email?.message}
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
                        onClick={() => popup({ employee: "", mode: "" })}
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
