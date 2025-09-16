import { useFormContext, useWatch } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import { formatDate } from "@/utils/formatDate";

const ruleTypeMap: Record<string, string> = {
    "1": "Giá trị hóa đơn tối thiểu",
    "2": "Số lượng sản phẩm tối thiểu",
    "3": "Loại sản phẩm cụ thể",
    "4": "Sản phẩm cụ thể",
};

const effectTypeMap: Record<string, string> = {
    "1": "Giảm giá theo phần trăm",
    "2": "Giảm giá theo số tiền cố định",
    "3": "Mua X tặng Y",
};

function DiscountResultForm() {
    const { control } = useFormContext<AddDiscountFormInputs>();
    const allInfo = useWatch({ control });

    console.log(allInfo);

    return (
        <div className="mt-6 space-y-6 rounded-xl border bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold">Discount Summary</h2>

            {/* Info Section */}
            <div>
                <h3 className="mb-2 font-semibold text-gray-700">Info</h3>
                <table className="w-full rounded-lg border border-gray-200">
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-medium">Promotion Name</td>
                            <td className="p-2">
                                {allInfo.info?.promotion_name || "-"}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-medium">
                                Distribution Type
                            </td>
                            <td className="p-2">
                                {allInfo.info?.distribution_type || "-"}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-medium">Valid From</td>
                            <td className="p-2">
                                {formatDate(
                                    allInfo.info?.valid_from?.toString() || "-",
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2 font-medium">Valid To</td>
                            <td className="p-2">
                                {formatDate(
                                    allInfo.info?.valid_to?.toString() || "-",
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Rules Section */}
            <div>
                <h3 className="mb-2 font-semibold text-gray-700">Rules</h3>
                <table className="w-full rounded-lg border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Rule Type</th>
                            <th className="p-2 text-left">Operator</th>
                            <th className="p-2 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allInfo.rules?.map((rule, index) => (
                            <tr key={index} className="border-t">
                                <td>
                                    {
                                        ruleTypeMap[
                                            rule.rule_type_id
                                                ? rule.rule_type_id
                                                : ""
                                        ]
                                    }
                                </td>
                                <td>{rule.rule_operator}</td>
                                <td>{rule.rule_operator}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Effect Section */}
            <div>
                <h3 className="mb-2 font-semibold text-gray-700">Effect</h3>
                <table className="w-full rounded-lg border border-gray-200">
                    <tbody>
                        <tr>
                            <td>Effect</td>
                            <td>{allInfo.effect?.effect_type_id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DiscountResultForm;
