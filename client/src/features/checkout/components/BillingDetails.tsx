import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";

function BillingDetails() {
    return (
        <div className="space-y-8">
            <div>
                <ShippingAddress />
            </div>

            <div>
                <PaymentMethod />
            </div>
        </div>
    );
}

export default BillingDetails;
