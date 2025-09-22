import { Button } from "@/components/shared";
import { FormCheckoutSection } from "@/layouts/Customer";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { updatePromotion } from "../redux/promotion.slice";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { setDiscountAmount, setFinalTotal } from "../redux/price.slice";
import type {
    PromotionDetail,
    PromotionIsValid,
} from "@/features/discount/types/discount.type";
import {
    checkPromotionCanApply,
    getAllPromotionThisCustomer,
} from "@/features/discount/services/discount.api";

function Discount() {
    const dispatch = useAppDispatch();
    const { cart } = useItemCartOnLoad();

    const [promotions, setPromotions] = useState<PromotionDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState<PromotionIsValid>("nothing");

    useEffect(() => {
        const fetchPromotions = async () => {
            const list = await getAllPromotionThisCustomer();
            setPromotions(list);
        };
        fetchPromotions();
    }, []);

    const handleApplyPromotion = async (promotionDetail: PromotionDetail) => {
        try {
            setLoading(true);
            const canApply = await checkPromotionCanApply(
                promotionDetail,
                cart,
            );

            console.log(canApply);

            if (canApply.success) {
                setIsValid(true);

                Object.entries(promotionDetail).map(([key, value]) => {
                    dispatch(
                        updatePromotion({
                            key: key as keyof PromotionDetail,
                            value,
                        }),
                    );
                });

                dispatch(setDiscountAmount(canApply.discount));
                dispatch(setFinalTotal(canApply.finalTotal));
            } else {
                setIsValid(false);
            }
        } catch (error) {
            console.log(error);
            setIsValid(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCheckoutSection>
            <div className="mb-3">
                <h1 className="text-xl font-bold">Khuyến mãi khả dụng</h1>

                {isValid === "nothing" ? null : isValid ? (
                    <div className="mt-1 text-green-600">
                        Áp dụng thành công
                    </div>
                ) : (
                    <div className="mt-1 text-red-500">
                        Không hợp lệ hoặc không đủ điều kiện
                    </div>
                )}
            </div>

            <div className="mt-2 flex flex-col gap-3">
                {promotions.map((promo) => (
                    <div
                        key={promo.promotion_id}
                        className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                        {/* Thông tin khuyến mãi */}
                        <div className="flex items-start gap-3">
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {promo.promotion_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Mã:{" "}
                                    <span className="font-mono">
                                        {promo.promotion_id}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Nút áp dụng */}
                        <div className="inline-flex">
                            <Button
                                disabled={loading}
                                loading={loading}
                                text="Áp dụng"
                                textSize="small"
                                type="small"
                                onClick={() => handleApplyPromotion(promo)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </FormCheckoutSection>
    );
}

export default Discount;
