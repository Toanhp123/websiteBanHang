import BillingAddress from "./BillingAddress";
import PaymentMethod from "./PaymentMethod";

function BillingDetails() {
    return (
        <div className="space-y-12">
            <div>
                <BillingAddress />
            </div>

            <div>
                <PaymentMethod />
            </div>
        </div>
    );
}

export default BillingDetails;
