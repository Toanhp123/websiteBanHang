import { CartBill, CartItemList } from "@/features/cart/components";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function CartPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Giỏ Hàng" />

            <Section>
                <div className="flex gap-8">
                    {/* Menu Trái */}
                    <div className="flex-3">
                        <CartItemList />
                    </div>

                    {/* Menu Phải */}
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
