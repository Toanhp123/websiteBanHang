import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { useForm, useFieldArray } from "react-hook-form";
import {
    createWarehouseImport,
    getAllWarehouse,
    getInventoryInWarehouseBySupplier,
} from "../services/warehouse.api";
import { useEffect, useState } from "react";
import type { Inventory, Warehouse } from "../types/warehouse.type";
import {
    warehouseImportSchema,
    type WarehouseImportFormInputs,
} from "../validations/warehouseImport.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Supplier } from "@/features/products/types/product.type";
import { getSupplier } from "@/features/products/services/product.api";
import { useNavigate } from "react-router-dom";

function WarehouseImportForm() {
    const navigate = useNavigate();
    const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
    const [supplierList, setSupplierList] = useState<Supplier[]>([]);
    const [productList, setProductList] = useState<Inventory[]>([]);

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<WarehouseImportFormInputs>({
        resolver: yupResolver(warehouseImportSchema),
        defaultValues: {
            warehouse_id: "",
            products: [{ product_id: "", quantity: 1 }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    const warehouseID = watch("warehouse_id");
    const supplierID = watch("supplier_id");
    const productsSelected = watch("products");

    const formatWarehouseData = warehouseList.map((warehouse) => ({
        id: warehouse.warehouse_id,
        name: warehouse.warehouse_name,
    }));
    const formatSupplierData = supplierList.map((supplier) => ({
        id: supplier.supplier_id,
        name: supplier.supplier_name,
    }));
    const formatProductData = (currentIndex: number) =>
        productList
            .filter((product) => {
                return !productsSelected.some(
                    (p, idx) =>
                        idx !== currentIndex &&
                        p.product_id === product.product_id.toString(),
                );
            })
            .map((product) => ({
                id: product.product_id,
                name: product.product_name,
            }));

    const handleGetAllWarehouseAndSupplier = async () => {
        try {
            const warehouse = await getAllWarehouse();
            const supplier = await getSupplier();

            if (warehouse) {
                setWarehouseList(warehouse);
            }
            if (supplier) {
                setSupplierList(supplier);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetInventoryInWarehouse = async (
        warehouse_id: number,
        supplier_id: string,
    ) => {
        try {
            const res = await getInventoryInWarehouseBySupplier(
                warehouse_id,
                supplier_id,
            );

            if (res) {
                setProductList(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data: WarehouseImportFormInputs) => {
        try {
            const res = await createWarehouseImport(data);

            if (res.success) {
                console.log(res.message);
                navigate('/dashboard/warehouseTransactions');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllWarehouseAndSupplier();
    }, []);

    useEffect(() => {
        if (Number(warehouseID) && supplierID) {
            handleGetInventoryInWarehouse(Number(warehouseID), supplierID);
        }
    }, [supplierID, warehouseID]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-2xl bg-white px-8 py-6"
        >
            <div className="grid grid-cols-2 gap-4">
                {/* Chọn kho */}
                <Dropdown
                    text="Kho"
                    options={formatWarehouseData}
                    register={register("warehouse_id")}
                    error={errors.warehouse_id?.message}
                />

                {/* Chọn nhà cung cấp */}
                <Dropdown
                    text="Nhà cung cấp"
                    options={formatSupplierData}
                    register={register("supplier_id")}
                    error={errors.supplier_id?.message}
                />
            </div>

            {/* Danh sách sản phẩm */}
            <div>
                <label className="mb-2 block font-semibold text-gray-700">
                    Sản phẩm
                </label>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-12 items-center gap-4"
                        >
                            <div className="col-span-6">
                                <Dropdown
                                    text="Sản phẩm"
                                    options={formatProductData(index)}
                                    register={register(
                                        `products.${index}.product_id`,
                                    )}
                                    error={
                                        errors.products?.[index]?.product_id
                                            ?.message
                                    }
                                />
                            </div>

                            <div className="col-span-4">
                                <InputForDashboard
                                    type="number"
                                    label="Số lượng"
                                    placeholder="0"
                                    register={register(
                                        `products.${index}.quantity` as const,
                                    )}
                                    error={
                                        errors.products?.[index]?.quantity
                                            ?.message
                                    }
                                />
                            </div>

                            <div>
                                <Button
                                    text="Xóa"
                                    bgColor="bg-red-100"
                                    borderColor="border-red-300"
                                    textColor="text-red-500"
                                    textSize="small"
                                    hoverColor="hover:bg-red-500"
                                    type="small"
                                    onClick={() => remove(index)}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ product_id: "", quantity: 1 })}
                        className="mt-2 rounded bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                    >
                        + Thêm sản phẩm
                    </button>
                </div>
            </div>

            <div className="inline-flex">
                <Button text="Lưu phiếu nhập" textSize="small" />
            </div>
        </form>
    );
}

export default WarehouseImportForm;
