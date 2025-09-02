import { Button, SelectQuantity } from "@/components/shared";
import { deleteItemInCartSync } from "@/features/cart/redux/cart.thunk";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { useAppDispatch } from "@/hooks/useRedux";
import { FormCheckoutSection } from "@/layouts";
import clsx from "clsx";
import { useEffect, useState } from "react";

function OrderReview() {
    const dispatch = useAppDispatch();
    const { cart } = useItemCartOnLoad();
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [expand, setExpand] = useState(false);

    const handleDeleteItemCart = async (id_product: number): Promise<void> => {
        dispatch(deleteItemInCartSync(id_product));
    };

    const handleExpandItem = (): void => {
        setExpand((expand) => !expand);
    };

    // TODO: cần suy nghĩ việc set lại state để OrderSummary đọc nhưng có thể làm ảnh hưởng đến việc component SelectQuantity
    useEffect(() => {
        if (cart && cart.length > 0) {
            const initialQuantities = cart.reduce(
                (acc, item) => {
                    acc[item.id_product] = item.quantity;
                    return acc;
                },
                {} as Record<number, number>,
            );

            setQuantities(initialQuantities);
        }
    }, [cart]);

    return (
        <FormCheckoutSection>
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Order Review</h1>

                    <div>
                        <Button
                            onClick={handleExpandItem}
                            textSize="small"
                            icon={
                                expand
                                    ? "fa-solid fa-arrow-up"
                                    : "fa-solid fa-arrow-down"
                            }
                            bgColor=""
                            textColor="text-black"
                            border=""
                        />
                    </div>
                </div>
                <p>{cart.length} items in cart</p>
            </div>

            <div
                className={clsx(
                    expand === true ? "" : "max-h-0 overflow-hidden",
                )}
            >
                {cart.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between gap-4">
                            <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-gray-300 p-1">
                                <img
                                    src={`http://localhost:3000/${item.img}`}
                                    alt="image"
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <p>{item.product}</p>

                                    <div>
                                        <Button
                                            onClick={() =>
                                                handleDeleteItemCart(
                                                    item.id_product,
                                                )
                                            }
                                            textSize="small"
                                            icon="fa-solid fa-xmark"
                                            bgColor=""
                                            textColor="text-black"
                                            border=""
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-6 pr-4">
                                    <SelectQuantity
                                        max={item.totalStock}
                                        product_id={item.id_product}
                                        quantity={quantities[item.id_product]}
                                        setQuantityInList={setQuantities}
                                        saveChangeCartToDatabase={true}
                                    />

                                    <div>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-4 border-b border-gray-300"></div>
                    </div>
                ))}
            </div>
        </FormCheckoutSection>
    );
}

export default OrderReview;
