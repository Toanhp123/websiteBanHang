import {
    AddToCartPopup,
    ItemProductBuy,
    ItemProductDescription,
} from "@/features/products/components";
import { selectStateAddCartMenuPopup } from "@/features/products/redux/addCartMenuPopup.slice";
import { useAppSelector } from "@/hooks/useRedux";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function ProductDetailPage() {
    const stateAddCartMenuPopup = useAppSelector(selectStateAddCartMenuPopup);

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

                {stateAddCartMenuPopup === true && <AddToCartPopup />}
            </div>

            <Footer />
        </div>
    );
}

export default ProductDetailPage;
