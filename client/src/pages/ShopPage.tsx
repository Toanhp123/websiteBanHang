import { Footer, Header, Section, ShopLayout } from "@/layouts";

function ShopPage() {
    return (
        <div>
            <Header />

            <div>
                <h1 className="text-center text-2xl font-bold md:text-3xl">
                    Shop
                </h1>

                <ShopLayout />
            </div>

            <Footer />
        </div>
    );
}

export default ShopPage;
