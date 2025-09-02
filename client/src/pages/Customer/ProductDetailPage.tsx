import {
    ItemProductBuy,
    ItemProductDescription,
} from "@/features/products/components";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function ProductDetailPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Product detail" />

            <div>
                <Section>
                    <div className="space-y-20">
                        <ItemProductBuy />

                        <ItemProductDescription />
                    </div>
                </Section>
            </div>

            <Footer />
        </div>
    );
}

export default ProductDetailPage;
