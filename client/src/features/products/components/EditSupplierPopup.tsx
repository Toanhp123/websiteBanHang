import { InputForDashboard } from "@/components/shared";
import type { EditPopupPros } from "../../warehouse/types/warehouse.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import {
    editSupplierSchema,
    type EditSupplierFormInputs,
} from "../validations/editSupplier.schema";
import { editSupplier, getSupplierByID } from "../services/product.api";

function EditSupplierPopup({ id, popup }: EditPopupPros) {
    const [originalData, setOriginalData] = useState<unknown>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EditSupplierFormInputs>({
        resolver: yupResolver(editSupplierSchema),
        defaultValues: {
            supplier_name: "",
        },
    });

    const currentData = watch();
    const isChanged =
        originalData &&
        JSON.stringify(originalData) !== JSON.stringify(currentData);

    const getChangedFields = (data: EditSupplierFormInputs) => {
        if (!originalData) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(data).forEach(([key, value]) => {
            if ((originalData as Record<string, unknown>)[key] !== value) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handleGetSupplier = async (supplier_id: string) => {
        try {
            const res = await getSupplierByID(supplier_id);

            const data = {
                supplier_name: res.supplier_name,
            };

            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof EditSupplierFormInputs, value);
            });

            setOriginalData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveEditSupplier = async (data: EditSupplierFormInputs) => {
        const changes = getChangedFields(data);

        try {
            if (id) {
                const res = await editSupplier(id, changes);

                if (res.success) {
                    console.log(res.message);

                    popup("supplier", "");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetSupplier(id);
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form
                className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"
                onSubmit={handleSubmit(handleSaveEditSupplier)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Export Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("supplier", "")}
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
                            register={register("supplier_name")}
                            error={errors.supplier_name?.message}
                        />
                    </div>
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

export default EditSupplierPopup;
