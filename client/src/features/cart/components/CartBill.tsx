import { Button } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCart } from "../redux/cart.slice";

function CartBill() {
    const cart = useAppSelector(selectCart);
    const navigate = useNavigate();
    const location = useLocation();
    let textRedirect: string = "Checkout";

    const OrderSummary = {
        items: Object.entries(cart).reduce((sum, [_, item]) => {
            return sum + (item.quantity || 0);
        }, 0),

        subTotal: Object.entries(cart).reduce((sum, [_, item]) => {
            return sum + (item.price * item.quantity || 0);
        }, 0),
    };

    if (location.pathname === "/cartShop/checkout") {
        textRedirect = "Payment";
    }

    // TODO: còn cần phải làm thêm
    const handleClick = (): void => {
        if (location.pathname === "/cartShop") {
            navigate("/cartShop/checkout");
        } else if (location.pathname === "/cartShop/checkout") {
            navigate("/");
        }
    };

    return (
        <div className="w-full space-y-4 rounded-xl border border-gray-300 p-4">
            <div className="text-xl font-bold">Order Summary</div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Items</p>
                <p className="font-semibold">{OrderSummary.items}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Sub Total</p>
                <p className="font-semibold">{OrderSummary.subTotal}</p>
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
                <p className="font-semibold">-100.00$</p>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Total</p>
                <p className="font-semibold">74.40$</p>
            </div>

            <Button
                text={`Process To ${textRedirect}`}
                textSize="small"
                onClick={handleClick}
                disabled={cart.length === 0}
            />
        </div>
    );
}

export default CartBill;
