import { Dropdown, InputForDashboard } from "@/components/shared";
import { useFormContext } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";

const dataDiscountApply = [
    {
        id: "invoice",
        name: "Hóa đơn",
    },
    {
        id: "product",
        name: "Sản phẩm",
    },
];

const dataDiscountDistribution = [
    {
        id: "share",
        name: "Chia sẻ",
    },
    {
        id: "exclusive",
        name: "Độc quyền",
    },
];

function DiscountInfoForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<AddDiscountFormInputs>();

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold">Thông tin khuyến mãi</h2>

            <div className="grid grid-cols-2 gap-8">
                <InputForDashboard
                    label="Tên khuyến mãi"
                    placeholder="Nhập tại đây"
                    register={register("info.promotion_name")}
                    error={errors.info?.promotion_name?.message}
                />
                <Dropdown
                    text="Phân phối khuyến mãi"
                    options={dataDiscountDistribution}
                    register={register("info.distribution_type")}
                    error={errors.info?.distribution_type?.message}
                />
                <Dropdown
                    text="Phạm vi áp dụng"
                    options={dataDiscountApply}
                    register={register("info.range_apply")}
                    error={errors.info?.range_apply?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputForDashboard
                        type="date"
                        label="Ngày bắt đầu"
                        register={register("info.valid_from")}
                        error={errors.info?.valid_from?.message}
                    />
                    <InputForDashboard
                        type="date"
                        label="Ngày kết thúc"
                        register={register("info.valid_to")}
                        error={errors.info?.valid_to?.message}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiscountInfoForm;
