import { Footer, Header, Section, TitleSection } from "@/layouts";

// TODO: cần xem xét nên làm trang này không
function CheckoutPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Checkout" />

            <Section>
                <div className="flex gap-8">1</div>
            </Section>

            <Footer />
        </div>
    );
}

export default CheckoutPage;
