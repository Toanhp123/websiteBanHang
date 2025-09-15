import { InvoiceCompleteOrder } from "@/features/invoice/components";
import type { Invoice } from "@/features/invoice/types/invoice.type";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";
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

            <TitleSection text="Hoàn tất đơn hàng" />

            <div>
                <Section>
                    <div className="space-y-12">
                        <div className="flex flex-col items-center gap-1">
                            <div className="bg-surface mb-4 flex h-15 w-15 items-center justify-center rounded-full">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <h1 className="text-2xl font-semibold">
                                Đơn hàng của bạn đã hoàn tất!
                            </h1>
                            <p className="text-disable font-semibold">
                                Cảm ơn bạn. Chúng tôi đã nhận được đơn hàng của
                                bạn.
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
