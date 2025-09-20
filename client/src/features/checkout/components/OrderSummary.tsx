import Loading from "@/features/loading/components/Loading";
import { createBill } from "../services/checkout.api";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { useAppSelector } from "@/hooks/useRedux";
import { selectBillDetail } from "../redux/billingDetail.slice";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared";
import { FormCheckoutSection } from "@/layouts/Customer";
import { selectPromotion } from "../redux/promotion.slice";
import { selectFinalTotal } from "../redux/price.slice";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
    const navigate = useNavigate();
    const { cart } = useItemCartOnLoad();
    const { discount, final_total } = useAppSelector(selectFinalTotal);
    const billDetail = useAppSelector(selectBillDetail);
    const promotionDetail = useAppSelector(selectPromotion);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderSummary, setOrderSummary] = useState({
        items: 0,
        subTotal: 0,
        discount: 0,
        final_total: 0,
    });

    const handleCreateBill = async (): Promise<void> => {
        setLoading(true);

        try {
            const invoice = await createBill(
                cart,
                billDetail,
                promotionDetail.promotion_id,
                discount,
                final_total,
            );

            if (invoice) {
                navigate("/OrderComplete", { state: { invoice } });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setOrderSummary({
            items: Object.entries(cart).reduce((sum, [_, item]) => {
                return sum + (item.quantity || 0);
            }, 0),

            subTotal: Object.entries(cart).reduce((sum, [_, item]) => {
                const price =
                    item.discountPrice !== null &&
                    item.discountPrice !== undefined
                        ? item.discountPrice
                        : item.price;

                return sum + (price * item.quantity || 0);
            }, 0),

            discount: discount,

            final_total: final_total,
        });
    }, [cart, promotionDetail, final_total, discount]);

    if (loading) return <Loading />;

    return (
        <FormCheckoutSection>
            <h1 className="text-xl font-bold">Tóm tắt đơn hàng</h1>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Sản phẩm</p>
                <p className="font-semibold">{orderSummary.items}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Tạm tính</p>
                <p className="font-semibold">{orderSummary.subTotal}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Phí vận chuyển</p>
                <p className="font-semibold">00.00₫</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Thuế</p>
                <p className="font-semibold">00.00₫</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Giảm giá</p>
                <p className="font-semibold">{orderSummary.discount}</p>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Tổng cộng</p>
                <p className="font-semibold">{orderSummary.final_total}</p>
            </div>

            <Button
                text="Tiến hành đặt hàng"
                textSize="small"
                onClick={handleCreateBill}
                disabled={
                    cart.length === 0 ||
                    Object.entries(billDetail).some(
                        ([key, value]) =>
                            key !== "payment_method" && value === "",
                    )
                }
            />
        </FormCheckoutSection>
    );
}

export default OrderSummary;
