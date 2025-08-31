import Discount from "./Discount";
import OrderReview from "./OrderReview";
import OrderSummary from "./OrderSummary";

function BillingSummary() {
    return (
        <div className="space-y-8">
            <div>
                <OrderReview />
            </div>

            <div>
                <Discount />
            </div>

            <div>
                <OrderSummary />
            </div>
        </div>
    );
}

export default BillingSummary;
