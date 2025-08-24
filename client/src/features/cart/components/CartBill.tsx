import { Button } from "@/components/shared";
import { useNavigate } from "react-router-dom";

function CartBill() {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate("/cartShop/checkout");
    };

    return (
        <div className="w-full space-y-4 rounded-xl border border-gray-300 p-4">
            <div>Order Summary</div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Items</p>
                <p className="font-semibold">9</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Sub Total</p>
                <p className="font-semibold">$85.40</p>
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
                text="Process To Checkout"
                textSize="small"
                onClick={handleClick}
            />
        </div>
    );
}

export default CartBill;
