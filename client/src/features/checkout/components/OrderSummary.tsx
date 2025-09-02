import Loading from "@/features/loading/components/Loading";
import { createBill } from "../services/checkout.api";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectBillDetail } from "../redux/billingDetail.slice";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared";
import { FormCheckoutSection } from "@/layouts";
import { selectPromotion } from "../redux/promotion.slice";
import { selectFinalTotal } from "../redux/price.slice";
import { useNavigate } from "react-router-dom";
import { setInvoice } from "@/features/invoice/redux/invoice.slice";

function OrderSummary() {
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        setOrderSummary({
            items: Object.entries(cart).reduce((sum, [_, item]) => {
                return sum + (item.quantity || 0);
            }, 0),

            subTotal: Object.entries(cart).reduce((sum, [_, item]) => {
                return sum + (item.price * item.quantity || 0);
            }, 0),

            discount: discount,

            final_total: final_total,
        });
    }, [cart, promotionDetail, final_total, discount]);

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
                dispatch(setInvoice(invoice));

                navigate("/OrderComplete", { state: { invoice } });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <FormCheckoutSection>
            <h1 className="text-xl font-bold">Order Summary</h1>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Items</p>
                <p className="font-semibold">{orderSummary.items}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Sub Total</p>
                <p className="font-semibold">{orderSummary.subTotal}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Shipping</p>
                <p className="font-semibold">00.00$</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Taxes</p>
                <p className="font-semibold">00.00$</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Coupon Discount</p>
                <p className="font-semibold">{orderSummary.discount}</p>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Total</p>
                <p className="font-semibold">{orderSummary.final_total}</p>
            </div>

            <Button
                text="Process To Checkout"
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
