import {
    InvoiceDetailPopup,
    InvoiceManager,
} from "@/features/invoice/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function DashboardOrdersPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        order: "",
        mode: "",
    });

    const toggleMenu = (values: Partial<Record<string, string>>) => {
        setPopup(
            (prev) =>
                ({
                    ...prev,
                    ...values,
                }) as Record<string, string>,
        );
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Danh sách Đơn hàng</h1>

                <InvoiceManager popup={toggleMenu} />

                {popup.mode === "detail" && (
                    <InvoiceDetailPopup id={popup.order} popup={toggleMenu} />
                )}
            </div>
        </MainLayout>
    );
}

export default DashboardOrdersPage;
