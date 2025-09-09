import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";
import { ListFilterOption, ListTagFilter } from "@/features/filters/components";
import { AddToCartPopup, ListProduct } from "@/features/products/components";
import { useAppSelector } from "@/hooks/useRedux";
import { selectStateAddCartMenuPopup } from "@/features/products/redux/addCartMenuPopup.slice";

function ShopPage() {
    const stateAddCartMenuPopup = useAppSelector(selectStateAddCartMenuPopup);

    return (
        <div>
            <Header />

            <TitleSection text="Shop" />

            <Section>
                <div className="relative flex gap-8">
                    {/* Left menu */}
                    <div className="flex-1">
                        <ListFilterOption />
                    </div>

                    {/* Right menu */}
                    <div className="flex-4">
                        <div className="space-y-4">
                            <ListTagFilter />

                            <ListProduct />
                        </div>
                    </div>
                </div>

                {stateAddCartMenuPopup === true && <AddToCartPopup />}
            </Section>

            <Footer />
        </div>
    );
}

export default ShopPage;
