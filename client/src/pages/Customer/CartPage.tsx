import { CartBill, CartItemList } from "@/features/cart/components";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function CartPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Shopping Cart" />

            <Section>
                <div className="flex gap-8">
                    {/* Left menu */}
                    <div className="flex-3">
                        <CartItemList />
                    </div>

                    {/* Right menu */}
                    <div className="flex-1">
                        <CartBill />
                    </div>
                </div>
            </Section>

            <Footer />
        </div>
    );
}

export default CartPage;
