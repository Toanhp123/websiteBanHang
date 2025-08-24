import bakery from "@/assets/images/categories/bakery.png";
import { Button, ImageProduct, TagItem } from "@/components/shared";
import { useState } from "react";

// TODO: cần thêm chức năng add to cart
function ItemProductBuy() {
    const [quantity, setQuantity] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    // TODO: cần lấy dữ liệu từ database
    const listImage: string[] = [bakery, bakery, bakery, bakery];

    const handleDecreaseQuantity = (): void => {
        if (quantity > 0) {
            setQuantity((q) => q - 1);
        }
    };

    const handleIncreaseQuantity = (): void => {
        setQuantity((q) => q + 1);
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

    return (
        <div className="flex gap-4">
            <div className="grid flex-1 grid-cols-4 gap-4">
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
                    <ImageProduct src={bakery} />
                </div>

                {listImage.map((img, index) => (
                    <ImageProduct
                        key={index}
                        src={img}
                        selected={index === page}
                    />
                ))}
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-4">
                <p className="text-secondary">Fruits</p>

                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold md:text-3xl">
                        Fresh Green Apple
                    </h1>

                    <TagItem
                        text="test tag item"
                        isTagOnly={true}
                        type="test"
                    />
                </div>

                <div className="flex gap-2">
                    <p className="text-2xl md:text-3xl">$25.00</p>
                    <p className="text-2xl text-gray-500 line-through md:text-3xl">
                        $50.00
                    </p>
                </div>

                <p className="text-disable">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quas, alias delectus vitae similique autem ut nemo
                    consequatur possimus nam assumenda. Accusantium corporis
                    eaque eligendi optio praesentium ullam incidunt alias
                    debitis!
                </p>

                <div className="mt-4 flex gap-4">
                    <div className="flex items-center justify-center rounded-4xl border border-gray-300">
                        <div
                            className="px-4 py-2"
                            onClick={() => {
                                handleDecreaseQuantity();
                            }}
                        >
                            -
                        </div>
                        <div className="h-full border-r border-gray-300"></div>
                        <div className="px-4 py-2">{quantity}</div>
                        <div className="h-full border-r border-gray-300"></div>
                        <div
                            className="px-4 py-2"
                            onClick={() => handleIncreaseQuantity()}
                        >
                            +
                        </div>
                    </div>

                    <Button text="Add To Cart" textSize="small" />
                    <Button
                        text="Buy Now"
                        textColor="text-black"
                        textSize="small"
                        bgColor="bg-surface"
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
            </div>
        </div>
    );
}

export default ItemProductBuy;
