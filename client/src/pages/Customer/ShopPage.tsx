import { Footer, Header, Section, TitleSection } from "@/layouts";
import { ListFilterOption, ListTagFilter } from "@/features/filters/components";
import { ListProduct } from "@/features/products/components";

function ShopPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Shop" />

            <Section>
                <div className="flex gap-8">
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
            </Section>

            <Footer />
        </div>
    );
}

export default ShopPage;
