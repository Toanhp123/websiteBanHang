import { useFormContext, useWatch } from "react-hook-form";
import type { AddDiscountFormInputs } from "../validations/addDiscount.schema";
import { formatDate } from "@/utils/formatDate";

function DiscountResultForm() {
    const { control } = useFormContext<AddDiscountFormInputs>();
    const allInfo = useWatch({ control });

    return (
        <div className="mt-6 space-y-6 rounded-xl border bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold">Tóm tắt khuyến mãi</h2>

            {/* Info Section */}
            <div>
                <h3 className="mb-2 font-semibold text-gray-700">Thông tin</h3>
                <table className="w-full rounded-lg border border-gray-200">
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-medium">Tên khuyến mãi</td>
                            <td className="p-2">
                                {allInfo.info?.promotion_name || "-"}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-medium">
                                Hình thức phân phối
                            </td>
                            <td className="p-2">
                                {allInfo.info?.distribution_type || "-"}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-medium">Ngày bắt đầu</td>
                            <td className="p-2">
                                {formatDate(
                                    allInfo.info?.valid_from?.toString() || "-",
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2 font-medium">Ngày kết thúc</td>
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
                <h3 className="mb-2 font-semibold text-gray-700">Điều kiện</h3>
                <table className="w-full rounded-lg border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Loại điều kiện</th>
                            <th className="p-2 text-left">Toán tử</th>
                            <th className="p-2 text-right">Giá trị</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allInfo.rules?.map((rule, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2 text-left">
                                    {rule.rule_type_description}
                                </td>
                                <td className="p-2 text-left">
                                    {rule.rule_operator}
                                </td>
                                <td className="p-2 text-right">
                                    {rule.rule_value_template}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Effect Section */}
            <div>
                <h3 className="mb-2 font-semibold text-gray-700">Hiệu lực</h3>

                <table className="w-full rounded-lg border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Loại hiệu lực</th>
                            <th className="p-2">Giá trị</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t">
                            <td className="p-2">
                                {allInfo.effect?.effect_type_description}
                            </td>
                            <td className="p-2">
                                {allInfo.effect?.effect_value
                                    ? allInfo.effect?.effect_value
                                    : allInfo.effect?.product_id}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DiscountResultForm;
