import { useEffect, useState } from "react";
import type { EditPopupPros } from "../types/warehouse.type";
import { editWarehouse, getWarehouseByID } from "../services/warehouse.api";
import { Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllEmployee } from "@/hooks/useGetAllEmployee";
import {
    editWarehouseSchema,
    type EditWarehouseFormInputs,
} from "../validations/editWarehouse.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function EditWarehouse({ id, popup }: EditPopupPros) {
    const allEmployee = useGetAllEmployee();

    const [originalData, setOriginalData] = useState<unknown>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EditWarehouseFormInputs>({
        resolver: yupResolver(editWarehouseSchema),
        defaultValues: {
            warehouse_name: "",
            location: "",
            priority: "",
            employee_id: "",
        },
    });

    const currentData = watch();

    const isChanged =
        originalData &&
        JSON.stringify(originalData) !== JSON.stringify(currentData);

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

            const data = {
                warehouse_name: res.warehouse_name,
                location: res.location,
                priority: res.priority.toString(),
                employee_id: res.employee_id.toString(),
            };

            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof EditWarehouseFormInputs, value);
            });

            setOriginalData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getChangedFields = (data: EditWarehouseFormInputs) => {
        if (!originalData) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(data).forEach(([key, value]) => {
            if ((originalData as Record<string, unknown>)[key] !== value) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handleSaveEditWarehouse = async (data: EditWarehouseFormInputs) => {
        const changes = getChangedFields(data);

        try {
            const res = await editWarehouse(Number(id), changes);

            if (res.success) {
                console.log(res.message);

                popup({
                    warehouse: "",
                    mode: "",
                });
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
                onSubmit={handleSubmit(handleSaveEditWarehouse)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Chi tiết kho</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() =>
                            popup({
                                warehouse: "",
                                mode: "",
                            })
                        }
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                        <InputForDashboard
                            label="Tên kho"
                            placeholder="Nhập tên kho"
                            register={register("warehouse_name")}
                            error={errors.warehouse_name?.message}
                        />

                        <InputForDashboard
                            name="warehouse_priority"
                            type="number"
                            label="Độ ưu tiên"
                            placeholder="0"
                            register={register("priority")}
                            error={errors.priority?.message}
                        />
                    </div>

                    <InputForDashboard
                        name="location"
                        label="Địa điểm kho"
                        placeholder="Nhập địa điểm"
                        register={register("location")}
                        error={errors.location?.message}
                    />

                    <Dropdown
                        text="Nhân viên phụ trách"
                        options={formatDataEmployee}
                        register={register("employee_id")}
                        error={errors.employee_id?.message}
                    />
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                        onClick={() =>
                            popup({
                                warehouse: "",
                                mode: "",
                            })
                        }
                    >
                        Hủy
                    </button>

                    <button
                        className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white disabled:bg-gray-500"
                        disabled={!isChanged}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditWarehouse;
