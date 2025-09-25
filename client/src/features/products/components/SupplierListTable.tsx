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
            {/* Form thêm */}
            <form
                className="space-y-8 rounded-2xl bg-white px-8 py-6"
                onSubmit={(e) => handleAddSupplier(e)}
            >
                {/* Tiêu đề */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Thêm nhà cung cấp</h2>
                </div>

                {/* Nội dung */}
                <div className="grid grid-cols-2 gap-8">
                    <InputForDashboard
                        label="Mã nhà cung cấp"
                        placeholder="Nhập vào đây"
                        value={supplierID}
                        setValue={setSupplierID}
                    />
                    <InputForDashboard
                        label="Tên nhà cung cấp"
                        placeholder="Nhập vào đây"
                        value={supplierName}
                        setValue={setSupplierName}
                    />
                </div>

                {/* Nút */}
                <div className="mt-6 flex justify-end gap-4">
                    <button className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white">
                        Lưu
                    </button>
                </div>
            </form>

            {/* Bảng danh sách */}
            <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
                <div>
                    <p className="font-semibold">
                        Tìm thấy {supplier.length} kết quả cho bạn
                    </p>

                    <div className="mt-4 border-b border-gray-300"></div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Mã</th>
                            <th className="px-4 py-2">Tên</th>
                            <th className="px-4 py-2 text-right">Hành động</th>
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
                                                popup({
                                                    supplier:
                                                        supplier.supplier_id,
                                                    mode: "edit",
                                                })
                                            }
                                        >
                                            Chỉnh sửa
                                        </button>

                                        <button
                                            className="font-semibold text-red-600 hover:text-red-500"
                                            onClick={() =>
                                                handleDeleteSupplier(
                                                    supplier.supplier_id,
                                                )
                                            }
                                        >
                                            Xóa
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
