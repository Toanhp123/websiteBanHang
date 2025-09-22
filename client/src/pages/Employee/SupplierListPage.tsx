import {
    EditSupplierPopup,
    SupplierListTable,
} from "@/features/products/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function SupplierListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        supplier: "",
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
                <h1 className="text-2xl font-semibold">Supplier List</h1>

                <SupplierListTable id={popup.supplier} popup={toggleMenu} />
            </div>

            {popup.supplier !== "" && (
                <EditSupplierPopup id={popup.supplier} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default SupplierListPage;
