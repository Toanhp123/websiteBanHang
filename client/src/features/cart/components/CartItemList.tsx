import bakery from "@/assets/images/categories/bakery.png";

function CartItemList() {
    return (
        // TODO: cần làm tiếp đang có đường kẻ trắng ở hàng đầu tiên
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
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2">
                            <div className="my-3 flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl border border-gray-300 p-2">
                                    <img src={bakery} alt="image" />
                                </div>

                                <h1>Fresh Oranges</h1>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-center">2</td>
                        <td className="px-4 py-2 text-right">3</td>
                        <td className="px-4 py-2 text-right">4</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2">
                            <div className="my-3 flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl border border-gray-300 p-2">
                                    <img src={bakery} alt="image" />
                                </div>

                                <h1>Fresh Oranges</h1>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-center">2</td>
                        <td className="px-4 py-2 text-right">3</td>
                        <td className="px-4 py-2 text-right">4</td>
                    </tr>
                </tbody>

                {/* TODO: cần làm thêm input và button cho item list */}
                <tfoot>
                    <tr>
                        <td className="flex">
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default CartItemList;
