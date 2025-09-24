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

function WarehouseTransactionsPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        import: "",
        export: "",
        inventory: "",
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

                        {popup.import !== "" && popup.mode === "detail" && (
                            <ReceiptDetailPopup
                                id={popup.import}
                                popup={toggleMenu}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="export">
                        <ExportTable popup={toggleMenu} />

                        {popup.export !== "" && popup.mode === "detail" && (
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

export default WarehouseTransactionsPage;
