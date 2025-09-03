import { Button, Input } from "@/components/shared";
import { FormCheckoutSection } from "@/layouts/Customer";
import { useEffect, useState } from "react";
import { checkPromotionCanApply, getPromotion } from "../services/checkout.api";
import { useAppDispatch } from "@/hooks/useRedux";
import type { PromotionDetail, PromotionIsValid } from "../types/checkout.type";
import { updatePromotion } from "../redux/promotion.slice";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { setDiscountAmount, setFinalTotal } from "../redux/price.slice";

function Discount() {
    const dispatch = useAppDispatch();
    const { cart } = useItemCartOnLoad();
    const [promotion, setPromotion] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<PromotionIsValid>("nothing");

    const handleApplyPromotion = async (promotion: string): Promise<void> => {
        if (!promotion) return;

        try {
            setLoading(true);
            const promotionDetail = await getPromotion(promotion);

            if (promotionDetail) {
                const canApply = await checkPromotionCanApply(
                    promotionDetail,
                    cart,
                );

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
            }
        } catch (error) {
            console.log(error);
            setIsValid(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const sub_total = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );

        dispatch(setFinalTotal(sub_total));
    }, [cart, dispatch]);

    return (
        <FormCheckoutSection>
            <div>
                <h1 className="text-xl font-bold">Discount Code</h1>

                {isValid === "nothing" ? (
                    ""
                ) : isValid ? (
                    <div className="text-main-primary">
                        Áp mã khuyến mãi thành công.
                    </div>
                ) : (
                    <div className="text-red-500">
                        Mã không hợp lệ hoặc không thỏa mã điều kiện !!!
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Enter your coupon here"
                    value={promotion}
                    setValue={setPromotion}
                />
                <Button
                    disabled={loading}
                    loading={loading}
                    text="Apply"
                    textSize="small"
                    onClick={() => handleApplyPromotion(promotion)}
                />
            </div>
        </FormCheckoutSection>
    );
}

export default Discount;
