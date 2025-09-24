import { useEffect, useState } from "react";
import type { EditPopupPros, ReceiptDetail } from "../types/warehouse.type";
import { getReceiptDetail } from "../services/warehouse.api";

function ReceiptDetailPopup({ id, popup }: EditPopupPros) {
    const [receiptDetail, setReceiptDetail] = useState<ReceiptDetail[]>([]);

    const handleGetReceiptDetail = async (receipt_id: number) => {
        try {
            const res = await getReceiptDetail(receipt_id);

            setReceiptDetail(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetReceiptDetail(Number(id));
        }
    }, [id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Receipt Detail</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() =>
                            popup({
                                import: "",
                                mode: "",
                            })
                        }
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="shadow-light max-h-[50vh] gap-6 overflow-y-auto rounded-2xl p-4">
                    <table className="w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="px-4 py-2">Code</th>
                                <th className="px-4 py-2">Product ID</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {receiptDetail.map((item) => (
                                <tr key={item.product_id}>
                                    <td className="px-4 py-2">
                                        {item.product_code}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.product_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.product_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.unit_price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default ReceiptDetailPopup;
