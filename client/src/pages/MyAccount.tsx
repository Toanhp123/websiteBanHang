import { AccountOptions } from "@/features/accounts/components";
import { Footer, Header, Section, TitleSection } from "@/layouts";

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
