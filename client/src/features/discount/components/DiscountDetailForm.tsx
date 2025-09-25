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
                    <h2 className="text-xl font-semibold">
                        Chi tiết khuyến mãi
                    </h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => popup({ discount: "", mode: "" })}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="max-h-[70vh] space-y-6 overflow-y-auto">
                    {/* Thông tin chung */}
                    {discountDetail && (
                        <div className="rounded-xl border p-4">
                            <h3 className="mb-3 font-semibold">
                                Thông tin chung
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p>
                                    <strong>Tên:</strong>{" "}
                                    {discountDetail.promotion_name}
                                </p>
                                <p>
                                    <strong>Trạng thái:</strong>{" "}
                                    {discountDetail.promotion_status}
                                </p>
                                <p>
                                    <strong>Hiệu lực từ:</strong>{" "}
                                    {discountDetail.valid_from}
                                </p>
                                <p>
                                    <strong>Hiệu lực đến:</strong>{" "}
                                    {discountDetail.valid_to}
                                </p>
                                <p>
                                    <strong>Hình thức phân phối:</strong>{" "}
                                    {discountDetail.distribution_type}
                                </p>
                                <p>
                                    <strong>Phạm vi áp dụng:</strong>{" "}
                                    {discountDetail.range_apply}
                                </p>
                                <p>
                                    <strong>Ngày tạo:</strong>{" "}
                                    {discountDetail.created_at}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Hiệu ứng */}
                    {discountDetail?.effects && (
                        <div className="rounded-xl border p-4">
                            <h3 className="mb-3 font-semibold">Hiệu ứng</h3>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2">
                                            Mã hiệu ứng
                                        </th>
                                        <th className="px-3 py-2">
                                            Mã sản phẩm
                                        </th>
                                        <th className="px-3 py-2">Giá trị</th>
                                        <th className="px-3 py-2">Loại</th>
                                        <th className="px-3 py-2">Mô tả</th>
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

                    {/* Điều kiện */}
                    {discountDetail?.rules &&
                        discountDetail?.rules?.length > 0 && (
                            <div className="rounded-xl border p-4">
                                <h3 className="mb-3 font-semibold">
                                    Điều kiện
                                </h3>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2">
                                                Mã luật
                                            </th>
                                            <th className="px-3 py-2">
                                                Giá trị
                                            </th>
                                            <th className="px-3 py-2">
                                                Toán tử
                                            </th>
                                            <th className="px-3 py-2">Mã SP</th>
                                            <th className="px-3 py-2">
                                                Mã danh mục
                                            </th>
                                            <th className="px-3 py-2">Loại</th>
                                            <th className="px-3 py-2">Mô tả</th>
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
