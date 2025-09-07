import { MainLayout } from "@/layouts/Employee";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    ExportTable,
    InventoryAuditTable,
    ReceiptTable,
} from "@/features/warehouse/components";

function WarehouseTransactions() {
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
                        <ReceiptTable />
                    </TabsContent>

                    <TabsContent value="export">
                        <ExportTable />
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
