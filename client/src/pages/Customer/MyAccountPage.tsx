import { AccountOptions } from "@/components/sections";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function MyAccount() {
    return (
        <div>
            <Header />

            <TitleSection text="My Account" />

            <div>
                <Section>
                    <AccountOptions />
                </Section>
            </div>

            <Footer />
        </div>
    );
}

export default MyAccount;
