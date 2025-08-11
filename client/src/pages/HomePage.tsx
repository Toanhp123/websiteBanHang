import {
    BestSeller,
    Categories,
    FeatureProduct,
    Hero,
} from "@/components/sections";
import { Footer, Header, Section } from "@/layouts";
function HomePage() {
    return (
        <div>
            <Header />

            <div>
                <Section>
                    <Hero />
                </Section>

                <Section>
                    <Categories />
                </Section>

                <Section>
                    <FeatureProduct />
                </Section>

                <Section>
                    <BestSeller />
                </Section>
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;
