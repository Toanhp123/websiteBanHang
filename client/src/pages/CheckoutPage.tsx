import { BillingDetails } from "@/features/checkout/components";
import { Footer, Header, Section, TitleSection } from "@/layouts";

function CheckoutPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Checkout" />

            <Section>
                <BillingDetails />
            </Section>

            <Footer />
        </div>
    );
}

export default CheckoutPage;
