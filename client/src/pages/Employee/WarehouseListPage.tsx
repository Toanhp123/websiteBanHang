import {
    EditWarehouse,
    WarehouseListTable,
} from "@/features/warehouse/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function WarehouseListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        warehouse: "",
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
                <h1 className="text-2xl font-semibold">Danh sách kho</h1>

                <WarehouseListTable id={popup.warehouse} popup={toggleMenu} />
            </div>

            {popup.mode === "edit" && (
                <EditWarehouse id={popup.warehouse} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default WarehouseListPage;
