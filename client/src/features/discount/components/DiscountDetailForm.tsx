import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";
import type { PromotionDetail } from "../types/discount.type";
import { useEffect, useState } from "react";
import { getPromotion } from "../services/discount.api";

function DiscountDetailForm({ id, popup }: EditPopupPros) {
    const [discountDetail, setDiscountDetail] = useState<PromotionDetail>();

    const handleGetReceiptDetail = async (promotion_id: string) => {
        try {
            const res = await getPromotion(promotion_id);

            setDiscountDetail(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetReceiptDetail(id);
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Promotion Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup("discount", "")}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="max-h-[70vh] space-y-6 overflow-y-auto">
                    {/* General Info */}
                    {discountDetail && (
                        <div className="rounded-xl border p-4">
                            <h3 className="mb-3 font-semibold">General Info</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {discountDetail.promotion_name}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {discountDetail.promotion_status}
                                </p>
                                <p>
                                    <strong>Valid From:</strong>{" "}
                                    {discountDetail.valid_from}
                                </p>
                                <p>
                                    <strong>Valid To:</strong>{" "}
                                    {discountDetail.valid_to}
                                </p>
                                <p>
                                    <strong>Distribution:</strong>{" "}
                                    {discountDetail.distribution_type}
                                </p>
                                <p>
                                    <strong>Range:</strong>{" "}
                                    {discountDetail.range_apply}
                                </p>
                                <p>
                                    <strong>Created At:</strong>{" "}
                                    {discountDetail.created_at}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Effects */}
                    {discountDetail?.effects && (
                        <div className="rounded-xl border p-4">
                            <h3 className="mb-3 font-semibold">Effects</h3>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2">Effect ID</th>
                                        <th className="px-3 py-2">
                                            Product ID
                                        </th>
                                        <th className="px-3 py-2">Value</th>
                                        <th className="px-3 py-2">Type</th>
                                        <th className="px-3 py-2">
                                            Description
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr
                                        key={discountDetail.effects.effect_id}
                                        className="border-t"
                                    >
                                        <td className="px-3 py-2">
                                            {discountDetail.effects.effect_id}
                                        </td>
                                        <td className="px-3 py-2">
                                            {discountDetail.effects.product_id}
                                        </td>
                                        <td className="px-3 py-2">
                                            {
                                                discountDetail.effects
                                                    .effect_value
                                            }
                                        </td>
                                        <td className="px-3 py-2">
                                            {discountDetail.effects.effect_type}
                                        </td>
                                        <td className="px-3 py-2">
                                            {
                                                discountDetail.effects
                                                    .effect_description
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Rules */}
                    {discountDetail?.rules &&
                        discountDetail?.rules?.length > 0 && (
                            <div className="rounded-xl border p-4">
                                <h3 className="mb-3 font-semibold">Rules</h3>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2">
                                                Rule ID
                                            </th>
                                            <th className="px-3 py-2">Value</th>
                                            <th className="px-3 py-2">
                                                Operator
                                            </th>
                                            <th className="px-3 py-2">
                                                Product ID
                                            </th>
                                            <th className="px-3 py-2">
                                                Category ID
                                            </th>
                                            <th className="px-3 py-2">Type</th>
                                            <th className="px-3 py-2">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {discountDetail.rules.map((r) => (
                                            <tr
                                                key={r.rule_id}
                                                className="border-t"
                                            >
                                                <td className="px-3 py-2">
                                                    {r.rule_id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.rule_value}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.rule_operator}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.product_id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.product_category_id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.rule_type}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {r.rule_description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </div>
            </form>
        </div>
    );
}

export default DiscountDetailForm;
