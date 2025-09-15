import { useState } from "react";
import Button from "../../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import type { ItemProductPros } from "../types/product.type";
import { useAppDispatch } from "@/hooks/useRedux";
import { addToCart } from "@/features/cart/redux/cart.slice";
import { getAccessToken, getRole } from "@/stores/authStore";
import { setStateMenuPopup } from "../redux/addCartMenuPopup.slice";

function ItemProduct({
    product_id,
    product_name,
    totalStock,
    price,
    category,
    images,
    Inventories,
}: ItemProductPros) {
    const [like, setLike] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const mainImage = images
        .filter((img) => img.is_main === 1)
        .map((img) => img.image_url)[0];

    const handleClickItem = (): void => {
        navigate(`/shop/productDetail/${product_id}`);
    };

    const handleAddToCart = () => {
        if (getAccessToken() && getRole() === "Customer") {
            if (totalStock > 0) {
                dispatch(
                    addToCart({
                        id_product: product_id,
                        product: product_name,
                        price,
                        img: mainImage,
                        quantity: 1,
                        Inventories,
                        totalStock: totalStock,
                    }),
                );
                dispatch(setStateMenuPopup(true));
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative flex flex-col justify-center rounded-2xl border border-gray-200 bg-white p-4">
            {/* Nhãn giảm giá */}
            <div className="absolute top-4 left-4 rounded-l-[8px] rounded-r-2xl bg-green-700 px-4 py-1 text-white">
                Giảm 50%
            </div>

            {/* Nút yêu thích */}
            <div
                className="shadow-light absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white pt-1 text-xl"
                onClick={() => setLike((like) => !like)}
            >
                {like ? (
                    <i className="fa-solid fa-heart text-black"></i>
                ) : (
                    <i className="fa-regular fa-heart"></i>
                )}
            </div>

            {/* Hình ảnh sản phẩm */}
            <div className="h-60 cursor-pointer" onClick={handleClickItem}>
                <div className="p-2">
                    <img
                        src={`http://localhost:3000/${mainImage}`}
                        alt="Ảnh sản phẩm"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {/* Danh mục và tồn kho */}
                <div className="flex items-center justify-between">
                    <p className="text-green-600">{category}</p>
                    <p className="font-semibold">Còn: {totalStock}</p>
                </div>

                {/* Tên sản phẩm */}
                <h1 className="text-[18px] font-bold">{product_name}</h1>

                {/* Giá và nút thêm vào giỏ */}
                <div className="grid grid-cols-2 text-[18px]">
                    <p className="font-semibold text-gray-500 line-through">
                        50.000₫
                    </p>

                    <div></div>

                    <p className="font-semibold">{Number(price)}₫</p>

                    <Button
                        text="Thêm"
                        textSize="small"
                        type="small"
                        icon="fa-solid fa-bag-shopping"
                        bgColor="bg-secondary-light"
                        textColor="text-main-primary"
                        border=""
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
