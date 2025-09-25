import {
    EditSupplierPopup,
    SupplierListTable,
} from "@/features/products/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function SupplierListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        supplier: "",
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
                <h1 className="text-2xl font-semibold">
                    Danh sách nhà cung cấp
                </h1>

                <SupplierListTable id={popup.supplier} popup={toggleMenu} />
            </div>

            {popup.mode === "edit" && (
                <EditSupplierPopup id={popup.supplier} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default SupplierListPage;
