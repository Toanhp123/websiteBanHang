import { useEffect, useState } from "react";
import type { PromotionDetail } from "../types/discount.type";
import { getAllPromotionThisCustomer } from "../services/discount.api";
import { formatDate } from "@/utils/formatDate";
import { Button, TagItem } from "@/components/shared";
import clsx from "clsx";

function DiscountListForCustomer() {
    const [discounts, setDiscounts] = useState<PromotionDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expand, setExpand] = useState(false);

    const handleExpandItem = (): void => {
        setExpand((expand) => !expand);
    };

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                setLoading(true);
                const res = await getAllPromotionThisCustomer();

                setDiscounts(res);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    if (loading) {
        return <p>Đang tải ưu đãi...</p>;
    }

    if (discounts.length === 0) {
        return <p>Hiện chưa có ưu đãi nào.</p>;
    }

    return (
        <div className="space-y-6">
            {discounts.map((discount) => (
                <div
                    key={discount.promotion_id}
                    className="shadow-light overflow-hidden rounded-2xl border border-gray-200"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gray-100 px-6 py-4">
                        <div className="flex gap-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {discount.promotion_name}
                            </h3>
                            <TagItem
                                text={
                                    discount.promotion_status === "active"
                                        ? "Đang diễn ra"
                                        : "Hết hạn"
                                }
                                isTagOnly={true}
                            />
                        </div>

                        <div>
                            <Button
                                onClick={handleExpandItem}
                                textSize="small"
                                icon={
                                    expand
                                        ? "fa-solid fa-arrow-up"
                                        : "fa-solid fa-arrow-down"
                                }
                                bgColor=""
                                textColor="text-black"
                                border=""
                            />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            expand ? "" : "max-h-0 overflow-hidden",
                        )}
                    >
                        {/* Info */}
                        <div className="px-6 py-4 text-sm text-gray-600">
                            <p className="mb-1">
                                <span className="font-medium text-gray-700">
                                    Hiệu lực:
                                </span>{" "}
                                {formatDate(discount.valid_from)} →{" "}
                                {formatDate(discount.valid_to)}
                            </p>
                            <p className="mb-1">
                                <span className="font-medium text-gray-700">
                                    Phạm vi áp dụng:
                                </span>{" "}
                                {discount.range_apply}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">
                                    Hình thức phân phối:
                                </span>{" "}
                                {discount.distribution_type}
                            </p>
                        </div>

                        {/* Effect (chỉ 1) */}
                        {discount.effects && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                    Ưu đãi
                                </h4>
                                <div className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
                                    {discount.effects.effect_description}:{" "}
                                    <strong>
                                        {discount.effects.effect_value}
                                    </strong>
                                </div>
                            </div>
                        )}

                        {/* Rules (list) */}
                        {discount.rules.length > 0 && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                    Điều kiện áp dụng
                                </h4>
                                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                    {discount.rules.map((r) => (
                                        <li key={r.rule_id}>
                                            {r.rule_description +
                                                `: ${r.rule_operator} ${r.rule_value}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DiscountListForCustomer;
