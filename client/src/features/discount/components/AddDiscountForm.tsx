import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DiscountInfoForm from "./DiscountInfoForm";
import DiscountRuleForm from "./DiscountRuleForm";
import DiscountEffectForm from "./DiscountEffectForm";
import {
    discountSchema,
    type AddDiscountFormInputs,
} from "../validations/addDiscount.schema";

function AddDiscountForm() {
    const tabs: ("info" | "rules" | "effect")[] = ["info", "rules", "effect"];
    const [activeTab, setActiveTab] = useState<"info" | "rules" | "effect">(
        "info",
    );

    const methods = useForm<AddDiscountFormInputs>({
        resolver: yupResolver(discountSchema),
        mode: "onBlur",
        defaultValues: {
            rules: [{ rule_type_name: "", rule_operator: "", rule_value: "" }],
        },
    });

    const { handleSubmit, trigger } = methods;

    const onSubmit = (data: AddDiscountFormInputs) => {
        console.log("Submit discount:", data);
    };

    // validate trước khi chuyển tab
    const handleTabChange = async (nextTab: "info" | "rules" | "effect") => {
        const currentIndex = tabs.indexOf(activeTab);
        const nextIndex = tabs.indexOf(nextTab);

        // TODO: tí làm xong thì uncomment
        // if (nextIndex > currentIndex) {
        //     const valid = await trigger(activeTab);
        //     if (!valid) return;
        // }

        setActiveTab(nextTab);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-2xl bg-white px-8 py-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Add Discount</h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b">
                    <button
                        type="button"
                        onClick={() => handleTabChange("info")}
                        className={`px-4 py-2 ${
                            activeTab === "info"
                                ? "border-main-primary text-main-primary border-b-2 font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        Info
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange("rules")}
                        className={`px-4 py-2 ${
                            activeTab === "rules"
                                ? "border-main-primary text-main-primary border-b-2"
                                : "text-gray-500"
                        }`}
                    >
                        Rule
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange("effect")}
                        className={`px-4 py-2 ${
                            activeTab === "effect"
                                ? "border-main-primary text-main-primary border-b-2"
                                : "text-gray-500"
                        }`}
                    >
                        Effect
                    </button>
                </div>

                {/* Body */}
                <div className="rounded-xl border p-6">
                    <div className={activeTab === "info" ? "block" : "hidden"}>
                        <DiscountInfoForm />
                    </div>
                    <div className={activeTab === "rules" ? "block" : "hidden"}>
                        <DiscountRuleForm />
                    </div>
                    <div
                        className={activeTab === "effect" ? "block" : "hidden"}
                    >
                        <DiscountEffectForm />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="submit"
                        className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white"
                    >
                        Save Discount
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

export default AddDiscountForm;
