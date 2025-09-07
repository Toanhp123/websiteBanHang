import { MainLayout } from "@/layouts/Employee";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    ExportDetailPopup,
    ExportTable,
    InventoryAuditTable,
    ReceiptDetailPopup,
    ReceiptTable,
} from "@/features/warehouse/components";
import { useState } from "react";

function WarehouseTransactions() {
    const [popup, setPopup] = useState<Record<string, string>>({
        import: "",
        export: "",
        inventory: "",
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
                <h1 className="text-2xl font-semibold">
                    Warehouse Transaction
                </h1>

                <Tabs defaultValue="import" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="import">
                            Import Receipts
                        </TabsTrigger>
                        <TabsTrigger value="export">
                            Export Receipts
                        </TabsTrigger>
                        <TabsTrigger value="inventory">
                            Inventory Audit
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="import">
                        <ReceiptTable popup={toggleMenu} />

                        {popup.import !== "" && (
                            <ReceiptDetailPopup
                                id={popup.import}
                                popup={toggleMenu}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="export">
                        <ExportTable popup={toggleMenu} />

                        {popup.export !== "" && (
                            <ExportDetailPopup
                                id={popup.export}
                                popup={toggleMenu}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="inventory">
                        <InventoryAuditTable />
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}

export default WarehouseTransactions;
