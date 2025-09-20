import { Button } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../redux/cart.slice";

function CartBill() {
    const cart = useAppSelector(selectCart);
    const navigate = useNavigate();

    const orderSummary = {
        items: cart.reduce((sum, item) => sum + (item.quantity || 0), 0),

        subTotal: cart.reduce((sum, item) => {
            const price =
                item.discountPrice !== null && item.discountPrice !== undefined
                    ? item.discountPrice
                    : item.price;

            return sum + price * (item.quantity || 0);
        }, 0),
    };

    const handleClick = (): void => {
        navigate("/cartShop/checkout");
    };

    return (
        <div className="w-full space-y-4 rounded-xl border border-gray-300 p-4">
            <div className="text-xl font-bold">Tóm Tắt Đơn Hàng</div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Sản Phẩm</p>
                <p className="font-semibold">{orderSummary.items}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Tạm Tính</p>
                <p className="font-semibold">{orderSummary.subTotal}₫</p>
            </div>
            <div className="flex justify-between">
                <p className="text-disable">Thuế</p>
                <p className="font-semibold">0.00</p>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex justify-between">
                <p className="text-disable">Tổng Cộng</p>
                <p className="font-semibold">{orderSummary.subTotal}₫</p>
            </div>

            <Button
                text="Thanh Toán"
                textSize="small"
                onClick={handleClick}
                disabled={cart.length === 0}
            />
        </div>
    );
}

export default CartBill;
