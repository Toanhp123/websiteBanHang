import {
    BestSeller,
    Categories,
    FeatureProduct,
    Hero,
} from "@/components/sections";
import { AddToCartPopup } from "@/features/products/components";
import { selectStateAddCartMenuPopup } from "@/features/products/redux/addCartMenuPopup.slice";
import { useAppSelector } from "@/hooks/useRedux";
import { Footer, Header, Section } from "@/layouts/Customer";

function HomePage() {
    const stateAddCartMenuPopup = useAppSelector(selectStateAddCartMenuPopup);

    return (
        <div>
            <Header />

            <div>
                <Hero />

                <Section>
                    <Categories />
                </Section>

                <Section>
                    <FeatureProduct />
                </Section>

                <Section>
                    <BestSeller />
                </Section>

                {stateAddCartMenuPopup === true && <AddToCartPopup />}
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;
