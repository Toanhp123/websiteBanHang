import { Button, Dropdown, InputForDashboard } from "@/components/shared";
import { useGetAllEmployee } from "@/hooks/useGetAllEmployee";
import { useNavigate } from "react-router-dom";
import { addWarehouse } from "../services/warehouse.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    addWarehouseSchema,
    type AddWarehouseFormInputs,
} from "../validations/addWarehouse.schema";

function AddWarehouseForm() {
    const allEmployee = useGetAllEmployee();
    const navigate = useNavigate();

    const formatDataEmployee =
        allEmployee?.map((employee) => ({
            id: employee.employee_id,
            name:
                employee.employee_first_name +
                " " +
                employee.employee_last_name,
        })) || [];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddWarehouseFormInputs>({
        resolver: yupResolver(addWarehouseSchema),
    });

    const handleSubmitForm = async (data: AddWarehouseFormInputs) => {
        try {
            const res = await addWarehouse(data);

            if (res.success) {
                navigate("/dashboard/warehouseList");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-2/3 rounded-2xl bg-white">
            <form
                className="space-y-8 px-8 py-6"
                onSubmit={handleSubmit(handleSubmitForm)}
            >
                <div className="grid grid-cols-2 gap-8">
                    <InputForDashboard
                        label="Tên kho"
                        placeholder="Nhập tên kho"
                        register={register("warehouseName")}
                        error={errors.warehouseName?.message}
                    />
                    <InputForDashboard
                        label="Địa điểm kho"
                        placeholder="Nhập địa điểm"
                        register={register("location")}
                        error={errors.location?.message}
                    />
                    <InputForDashboard
                        label="Độ ưu tiên"
                        type="number"
                        placeholder="0"
                        register={register("priority")}
                        error={errors.priority?.message}
                    />
                    <Dropdown
                        text="Nhân viên phụ trách"
                        options={formatDataEmployee}
                        register={register("employeeID")}
                        error={errors.employeeID?.message}
                    />
                </div>

                <div className="inline-flex">
                    <Button text="Thêm kho" textSize="small" />
                </div>
            </form>
        </div>
    );
}

export default AddWarehouseForm;
