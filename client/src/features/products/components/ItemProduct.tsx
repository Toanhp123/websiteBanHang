import { useState } from "react";
import Button from "../../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import type { ItemProductPros } from "../types/product.type";
import { useAppDispatch } from "@/hooks/useRedux";
import { addToCart } from "@/features/cart/redux/cart.slice";

function ItemProduct({
    id,
    totalStock,
    img,
    price,
    name,
    category,
}: ItemProductPros) {
    const [like, setLike] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickItem = (): void => {
        navigate("/shop/productDetail");
    };

    const handleClickButton = () => {
        dispatch(addToCart({ id, product: name, price, img, quantity: 1 }));
    };

    //TODO: Có thể cần thêm size thẻ -- max-h-90 min-h-70 max-w-65 min-w-45
    return (
        <div className="relative flex flex-col justify-center rounded-2xl border border-gray-200 bg-white p-4">
            <div onClick={() => handleClickItem()}>
                <div className="absolute top-4 left-4 rounded-l-[8px] rounded-r-2xl bg-green-700 px-4 py-1 text-white">
                    50% off
                </div>

                <div
                    className="shadow-light absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full pt-1 text-xl"
                    onClick={() => setLike((like) => !like)}
                >
                    {like ? (
                        <i className="fa-solid fa-heart text-secondary"></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )}
                </div>

                <div className="p-6">
                    <img src={img} alt="image" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-green-600">{category}</p>
                    <p className="font-semibold">Stock: {totalStock}</p>
                </div>

                <h1 className="text-[18px] font-bold">{name}</h1>

                <div className="bg-sur flex items-center justify-between text-[18px]">
                    <div className="flex gap-2">
                        <p className="font-semibold text-gray-500 line-through">
                            $50.00
                        </p>
                        <p className="font-semibold">{price}</p>
                    </div>

                    <Button
                        text="Add"
                        textSize="small"
                        type="small"
                        icon="fa-solid fa-bag-shopping"
                        bgColor="bg-secondary-light"
                        textColor="text-primary"
                        border=""
                        onClick={handleClickButton}
                    />
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
