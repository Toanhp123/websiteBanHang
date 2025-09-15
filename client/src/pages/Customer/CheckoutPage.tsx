import { BillingDetails, BillingSummary } from "@/features/checkout/components";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function CheckoutPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Thanh Toán" />

            <Section>
                <div className="flex gap-8">
                    {/* Menu Trái */}
                    <div className="flex-1">
                        <BillingDetails />
                    </div>

                    {/* Menu Phải */}
                    <div className="">
                        <BillingSummary />
                    </div>
                </div>
            </Section>

            <Footer />
        </div>
    );
}

export default CheckoutPage;
