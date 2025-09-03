import { useAppDispatch } from "@/hooks/useRedux";
import { Button, SelectQuantity } from "@/components/shared";
import { deleteCartAsync, deleteItemInCartSync } from "../redux/cart.thunk";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { useEffect, useState } from "react";

function CartItemList() {
    const dispatch = useAppDispatch();
    const { cart } = useItemCartOnLoad();
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const handleDeleteCart = (): void => {
        dispatch(deleteCartAsync());
    };

    const handleDeleteItemCart = async (id_product: number): Promise<void> => {
        dispatch(deleteItemInCartSync(id_product));
    };

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
        <div>
            <table className="w-full border-separate border-spacing-0 text-left">
                <thead>
                    <tr className="bg-surface">
                        <th className="rounded-tl-xl rounded-bl-xl"></th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-center">Quantity</th>
                        <th className="rounded-tr-xl rounded-br-xl px-6 py-2 text-right">
                            Subtotal
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {cart.length !== 0 &&
                        cart.map((item) => (
                            <tr key={item.id_product}>
                                <td className="border-b border-gray-300">
                                    <div className="ml-6 flex w-4 items-center justify-center">
                                        <Button
                                            onClick={() =>
                                                handleDeleteItemCart(
                                                    item.id_product,
                                                )
                                            }
                                            icon="fa-solid fa-xmark"
                                            bgColor=""
                                            textColor="text-black"
                                            border=""
                                        />
                                    </div>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    <div className="my-3 flex items-center gap-4">
                                        <div className="flex h-18 w-18 items-center justify-center rounded-xl border border-gray-300 p-1">
                                            <img
                                                src={`http://localhost:3000/${item.img}`}
                                                alt="image"
                                            />
                                        </div>

                                        <h1>{item.product}</h1>
                                    </div>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-left">
                                    {item.price}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-center">
                                    <SelectQuantity
                                        max={item.totalStock}
                                        product_id={item.id_product}
                                        quantity={quantities[item.id_product]}
                                        setQuantityInList={setQuantities}
                                        saveChangeCartToDatabase={true}
                                    />
                                </td>
                                <td className="border-b border-gray-300 px-6 py-2 text-right">
                                    {item.price * item.quantity}
                                </td>
                            </tr>
                        ))}

                    {cart.length === 0 && (
                        <tr>
                            <td>
                                <div className="ml-2"></div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                            {cart.length > 0 && (
                                <p
                                    className="text-main-primary mt-5 font-semibold underline"
                                    onClick={handleDeleteCart}
                                >
                                    Clear Shopping Cart
                                </p>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default CartItemList;
