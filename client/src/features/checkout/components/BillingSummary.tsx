import { Button } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { createBill } from "../services/checkout.api";
import { selectBillDetail } from "../redux/billingDetail.slice";
import { useItemCartOnLoad } from "@/hooks/useItemCartOnLoad";
import { useState } from "react";
import Loading from "@/features/loading/components/Loading";

function BillingSummary() {
    const { cart } = useItemCartOnLoad();
    const billDetailSlice = useAppSelector(selectBillDetail);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateBill = async (): Promise<void> => {
        setLoading(true);
        await createBill(cart, billDetailSlice);
        setLoading(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="shadow-light m-2 space-y-6 rounded-2xl p-8">
            <h1 className="text-xl font-bold">Order Summary</h1>

            <Button
                text="Process To Checkout"
                textSize="small"
                onClick={handleCreateBill}
                disabled={cart.length === 0}
            />
        </div>
    );
}

export default BillingSummary;
