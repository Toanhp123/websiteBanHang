import { BillingDetails, BillingSummary } from "@/features/checkout/components";
import { Footer, Header, Section, TitleSection } from "@/layouts";

function CheckoutPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Checkout" />

            <Section>
                <div className="flex gap-8">
                    {/* Left menu */}
                    <div className="flex-4">
                        <BillingDetails />
                    </div>

                    {/* Right menu */}
                    <div className="flex-2">
                        <BillingSummary />
                    </div>
                </div>
            </Section>

            <Footer />
        </div>
    );
}

export default CheckoutPage;
