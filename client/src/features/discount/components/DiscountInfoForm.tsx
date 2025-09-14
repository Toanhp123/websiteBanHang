import { Dropdown, InputForDashboard } from "@/components/shared";
import { useFormContext } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";

const dataDiscountApply = [
    {
        id: "invoice",
        name: "invoice",
    },
    {
        id: "product",
        name: "product",
    },
];

const dataDiscountDistribution = [
    {
        id: "share",
        name: "share",
    },
    {
        id: "exclusive",
        name: "exclusive",
    },
];

function DiscountInfoForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<AddDiscountFormInputs>();

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold">Discount Information</h2>

            <div className="grid grid-cols-2 gap-8">
                <InputForDashboard
                    label="Discount Name"
                    placeholder="Type Here"
                    register={register("info.promotion_name")}
                    error={errors.info?.promotion_name?.message}
                />
                <Dropdown
                    text="Discount Distribution"
                    options={dataDiscountDistribution}
                    register={register("info.distribution_type")}
                    error={errors.info?.distribution_type?.message}
                />
                <Dropdown
                    text="Discount Apply"
                    options={dataDiscountApply}
                    register={register("info.range_apply")}
                    error={errors.info?.range_apply?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputForDashboard
                        type="date"
                        label="Discount Start"
                        register={register("info.valid_from")}
                        error={errors.info?.valid_from?.message}
                    />
                    <InputForDashboard
                        type="date"
                        label="Discount End"
                        register={register("info.valid_to")}
                        error={errors.info?.valid_to?.message}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiscountInfoForm;
