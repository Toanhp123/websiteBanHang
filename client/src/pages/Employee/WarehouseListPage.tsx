import {
    EditWarehouse,
    WarehouseListTable,
} from "@/features/warehouse/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function WarehouseListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        warehouse: "",
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
                <h1 className="text-2xl font-semibold">Warehouse List</h1>

                <WarehouseListTable id={popup.warehouse} popup={toggleMenu} />
            </div>

            {popup.warehouse !== "" && (
                <EditWarehouse id={popup.warehouse} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default WarehouseListPage;
