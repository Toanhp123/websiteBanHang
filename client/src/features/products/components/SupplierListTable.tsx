import { useEffect, useState } from "react";
import {
    addSupplier,
    deleteSupplier,
    getSupplier,
} from "../services/product.api";
import type { Supplier } from "../types/product.type";
import { InputForDashboard } from "@/components/shared";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";

function SupplierListTable({ id, popup }: EditPopupPros) {
    const [supplier, setSupplier] = useState<Supplier[]>([]);
    const [supplierID, setSupplierID] = useState<string>("");
    const [supplierName, setSupplierName] = useState<string>("");
    const [reload, setReload] = useState<boolean>(false);

    const handleGetAllSupplier = async () => {
        try {
            const res = await getSupplier();

            setSupplier(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteSupplier = async (supplier_id: string) => {
        try {
            const res = await deleteSupplier(supplier_id);

            if (res.success) {
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddSupplier = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = {
                supplier_name: supplierName,
                supplier_id: supplierID,
            };

            const res = await addSupplier(data);

            if (res) {
                setSupplier((prev) => [...prev, res]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllSupplier();
    }, [id, reload]);

    return (
        <div className="space-y-8">
            {/* Add Form */}
            <form
                className="space-y-8 rounded-2xl bg-white px-8 py-6"
                onSubmit={(e) => handleAddSupplier(e)}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Add Supplier</h2>
                </div>

                {/* Body */}
                <div className="grid grid-cols-2 gap-8">
                    <InputForDashboard
                        label="Supplier ID"
                        placeholder="Type Here"
                        value={supplierID}
                        setValue={setSupplierID}
                    />
                    <InputForDashboard
                        label="Supplier Name"
                        placeholder="Type Here"
                        value={supplierName}
                        setValue={setSupplierName}
                    />
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white">
                        Save
                    </button>
                </div>
            </form>

            {/* List Table */}
            <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                <div>
                    <p className="font-semibold">
                        We found {supplier.length} result for you
                    </p>

                    <div className="mt-4 border-b border-gray-300"></div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {supplier.map((supplier) => (
                            <tr key={supplier.supplier_id}>
                                <td className="px-4 py-2">
                                    {supplier.supplier_id}
                                </td>
                                <td className="px-4 py-2">
                                    {supplier.supplier_name}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <div className="flex w-full items-center justify-end gap-4">
                                        <button
                                            className="font-semibold text-green-600 hover:text-green-500"
                                            onClick={() =>
                                                popup(
                                                    "supplier",
                                                    supplier.supplier_id,
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="font-semibold text-red-600 hover:text-red-500"
                                            onClick={() =>
                                                handleDeleteSupplier(
                                                    supplier.supplier_id,
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SupplierListTable;
