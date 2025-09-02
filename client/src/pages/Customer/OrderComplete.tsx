import { InvoiceCompleteOrder } from "@/features/invoice/components";
import type { Invoice } from "@/features/invoice/types/invoice.type";
import { Footer, Header, Section, TitleSection } from "@/layouts";
import { Navigate, useLocation } from "react-router-dom";

function OrderComplete() {
    const location = useLocation();
    const invoice: Invoice = location.state?.invoice;

    if (!invoice || !invoice.invoice_id) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Header />

            <TitleSection text="Order Complete" />

            <div>
                <Section>
                    <div className="space-y-12">
                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl font-semibold">
                                Your Order Is Completed!
                            </h1>
                            <p className="text-disable font-semibold">
                                Thank you. Your Order have received
                            </p>
                        </div>

                        <div>
                            <InvoiceCompleteOrder />
                        </div>
                    </div>
                </Section>
            </div>

            <Footer />
        </div>
    );
}

export default OrderComplete;
