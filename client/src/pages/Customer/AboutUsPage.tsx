import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

// TODO: làm sau không quan trọng
function AboutUsPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Giới Thiệu" />

            <Section>
                <div>
                    <h1>Source Code</h1>
                    <p>https://github.com/Toanhp123/websiteBanHang.git</p>
                </div>
            </Section>

            <Footer />
        </div>
    );
}

export default AboutUsPage;
