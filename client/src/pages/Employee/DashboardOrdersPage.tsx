import {
    InvoiceDetailPopup,
    InvoiceManager,
} from "@/features/invoice/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function DashboardOrdersPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        order: "",
    });

    const toggleMenu = (menu: string, value: string) => {
        setPopup((prev) => ({
            ...prev,
            [menu]: value,
        }));
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Order List</h1>

                <InvoiceManager popup={toggleMenu} />

                {popup.order !== "" && (
                    <InvoiceDetailPopup id={popup.order} popup={toggleMenu} />
                )}
            </div>
        </MainLayout>
    );
}

export default DashboardOrdersPage;
