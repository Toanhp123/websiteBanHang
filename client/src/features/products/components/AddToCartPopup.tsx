import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setStateMenuPopup } from "../redux/addCartMenuPopup.slice";
import { selectCart } from "@/features/cart/redux/cart.slice";
import Button from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

function AddToCartPopup() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const lastItem = cart.length > 0 ? cart.at(-1) : null;
    const navigate = useNavigate();

    const handleClosePopup = () => {
        dispatch(setStateMenuPopup(false));
    };

    const handleGoToCart = () => {
        dispatch(setStateMenuPopup(false));

        navigate("/cartShop");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <div className="animate-fadeIn max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <h2 className="text-main-primary mb-6 text-xl font-semibold">
                    Added to your Cart
                </h2>

                {/* Body */}
                {lastItem ? (
                    <div className="flex items-center gap-6">
                        {/* Product image */}
                        <div className="h-32 w-32 overflow-hidden rounded-lg border">
                            <img
                                src={`http://localhost:3000/${lastItem.img}`}
                                alt={lastItem.product}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Product info */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">
                                {lastItem.product}
                            </h3>
                            <p className="text-gray-500">
                                Quantity: {lastItem.quantity}
                            </p>
                            <p className="text-main-primary text-lg font-bold">
                                {lastItem.price}
                            </p>
                            <p className="text-sm text-gray-400">
                                Stock left: {lastItem.totalStock}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>No product found in cart</p>
                )}

                {/* Footer */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button
                        text="Continue To Shop"
                        onClick={handleClosePopup}
                        textColor="text-gray-800"
                        bgColor="bg-gray-200"
                        type="small"
                        textSize="small"
                    />
                    <Button
                        text={`View My Cart`}
                        bgColor="bg-main-primary"
                        onClick={handleGoToCart}
                        textColor="text-white"
                        textSize="small"
                        type="small"
                    />
                </div>
            </div>
        </div>
    );
}

export default AddToCartPopup;
