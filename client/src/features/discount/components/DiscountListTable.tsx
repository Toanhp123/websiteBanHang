import { useState } from "react";
import type { PromotionDetail } from "../types/discount.type";

function DiscountListTable() {
    const [discountList, setDiscountList] = useState<PromotionDetail[]>([]);

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div>
                <p className="font-semibold">
                    We found {discountList.length} result for you
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DiscountListTable;
