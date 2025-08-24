import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteAllCart, selectCart } from "../redux/cart.slice";

function CartItemList() {
    const listCart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const handleDeleteAllCart = () => {
        dispatch(deleteAllCart());
    };

    return (
        <div>
            <table className="w-full border-separate border-spacing-0 text-left">
                <thead>
                    <tr className="bg-surface">
                        <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">
                            Product
                        </th>
                        <th className="px-4 py-2 text-center">Price</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="rounded-tr-xl rounded-br-xl px-4 py-2 text-right">
                            Subtotal
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listCart.map((item) => (
                        <tr className="border-b border-gray-300" key={item.id}>
                            <td className="px-4 py-2">
                                <div className="my-3 flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-xl border border-gray-300 p-2">
                                        <img src={item.img} alt="image" />
                                    </div>

                                    <h1>{item.product}</h1>
                                </div>
                            </td>
                            <td className="px-4 py-2 text-center">
                                {item.price}
                            </td>
                            <td className="px-4 py-2 text-right">
                                {item.quantity}
                            </td>
                            <td className="px-4 py-2 text-right">
                                {item.price * item.quantity}
                            </td>
                        </tr>
                    ))}
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
                            {listCart.length > 0 && (
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
