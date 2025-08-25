import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteAllCart, selectCart, setCart } from "../redux/cart.slice";
import { useEffect } from "react";
import {
    deleteCartAtDatabase,
    getCartFromDatabase,
} from "../services/cart.api";
import { Button } from "@/components/shared";

function CartItemList() {
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const handleDeleteAllCart = (): void => {
        dispatch(deleteAllCart());
    };

    const handleDeleteItemCart = async (id_product: number): Promise<void> => {
        await deleteCartAtDatabase(id_product);
    };

    useEffect(() => {
        // Chỉ gọi API khi redux cart trống
        if (!cart || cart.length === 0) {
            console.log(1);

            (async () => {
                const res = await getCartFromDatabase();
                dispatch(setCart(res));
            })();
        }
    }, [cart, dispatch]);

    return (
        <div>
            <table className="w-full border-separate border-spacing-0 text-left">
                <thead>
                    <tr className="bg-surface">
                        <th className="rounded-tl-xl rounded-bl-xl"></th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2 text-center">Price</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="rounded-tr-xl rounded-br-xl px-4 py-2 text-right">
                            Subtotal
                        </th>
                    </tr>
                </thead>

                {/* TODO: cần làm thêm về giao diện */}
                <tbody>
                    {cart.length !== undefined &&
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
                                <td className="border-b border-gray-300 px-4 py-2 text-center">
                                    {item.price}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-right">
                                    {item.quantity}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-right">
                                    {item.price * item.quantity}
                                </td>
                            </tr>
                        ))}

                    {cart.length === undefined && (
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
                        {/* TODO: cần làm thêm input và button áp dụng khuyến mãi cho item list */}
                        <td className="flex">
                            {/* <Input />
                            <Button /> */}
                        </td>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                            {cart.length > 0 && (
                                <p
                                    className="text-primary font-semibold underline"
                                    onClick={handleDeleteAllCart}
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
