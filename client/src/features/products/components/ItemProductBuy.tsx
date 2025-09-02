import {
    Button,
    ImageProduct,
    SelectQuantity,
    TagItem,
} from "@/components/shared";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/features/loading/components/Loading";
import { addToCart } from "@/features/cart/redux/cart.slice";
import { getAccessToken } from "@/stores/authStore";
import { useAppDispatch } from "@/hooks/useRedux";
import { useProductDetail } from "@/hooks/useProductDetail";

// TODO: cần thêm chức năng add to cart
function ItemProductBuy() {
    const { product_id } = useParams();
    const [mainImageShow, setMainImageShow] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { productDetail, listImage, mainImage, loading } =
        useProductDetail(product_id);

    const handleAddItemToCart = (): void => {
        if (getAccessToken()) {
            dispatch(
                addToCart({
                    id_product: productDetail.product_id,
                    product: productDetail.product_name,
                    price: productDetail.price,
                    img: mainImage,
                    quantity: quantity,
                    Inventories: productDetail.Inventories,
                    totalStock: productDetail.totalStock,
                }),
            );
        } else {
            navigate("/login");
        }
    };

    // TODO: cần thêm logic
    const handleBuyItemNow = (): void => {
        navigate("/cart/checkout/${product_id}");
    };

    const handleBackImageSlide = (): void => {
        if (page === 0) {
            setPage(listImage.length - 1);
        } else {
            setPage(page - 1);
        }
    };
    const handleNextImageSlide = (): void => {
        if (page === listImage.length - 1) {
            setPage(0);
        } else {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (listImage.length > 0) {
            setMainImageShow(listImage[page] || listImage[0]);
        }
    }, [listImage, page]);

    if (loading) return <Loading />;

    return (
        <div className="flex gap-8">
            {/* TODO: giao diện ảnh đang bị lỗi */}
            <div className="grid flex-2 grid-cols-4 gap-4">
                <div className="relative col-span-4">
                    <div className="absolute flex h-full w-full items-center justify-between px-4">
                        <Button
                            text="<"
                            type="icon"
                            border=""
                            onClick={handleBackImageSlide}
                        />
                        <Button
                            text=">"
                            type="icon"
                            border=""
                            onClick={handleNextImageSlide}
                        />
                    </div>

                    <ImageProduct
                        src={`http://localhost:3000/${mainImageShow}`}
                    />
                </div>

                {listImage.map((img, index) => (
                    <ImageProduct
                        key={index}
                        src={`http://localhost:3000/${img}`}
                        selected={index === page}
                    />
                ))}
            </div>

            <div className="flex flex-3 flex-col justify-center space-y-2">
                <p className="text-secondary text-xl">
                    {productDetail.category}
                </p>

                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold md:text-3xl">
                        {productDetail.product_name}
                    </h1>

                    <TagItem
                        text={
                            productDetail?.totalStock > 0
                                ? "In Stock"
                                : "Out Stock"
                        }
                        isTagOnly={true}
                        type="test"
                    />
                </div>

                <div className="flex gap-2">
                    <p className="text-2xl md:text-3xl">
                        {Number(productDetail.price)}
                    </p>
                    <p className="text-2xl text-gray-500 line-through md:text-3xl">
                        $50.00
                    </p>
                </div>

                <p className="text-disable">
                    {productDetail.product_description}
                </p>

                <div className="mt-4 flex gap-4">
                    <SelectQuantity
                        max={productDetail.totalStock}
                        product_id={productDetail.product_id}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />

                    <Button
                        text="Add To Cart"
                        textSize="small"
                        onClick={() => handleAddItemToCart()}
                        disabled={quantity === 0}
                    />
                    <Button
                        text="Buy Now"
                        textColor="text-black"
                        textSize="small"
                        bgColor="bg-surface"
                        onClick={() => handleBuyItemNow()}
                    />

                    <div className="flex items-center justify-center">
                        <Button
                            icon="fa-solid fa-heart"
                            bgColor=""
                            textColor="black"
                            type="icon"
                            borderColor="border-gray-300"
                        />
                    </div>
                </div>

                <div className="my-4 border-b border-gray-300"></div>

                <div className="flex-cols flex gap-2">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default ItemProductBuy;
