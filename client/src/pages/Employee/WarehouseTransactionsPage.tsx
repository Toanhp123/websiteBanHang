import { MainLayout } from "@/layouts/Employee";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    ExportDetailPopup,
    ExportTable,
    InventoryAuditTable,
    ReceiptDetailPopup,
    ReceiptRefundedDetailPopup,
    ReceiptRefundedTable,
    ReceiptTable,
} from "@/features/warehouse/components";
import { useState } from "react";

function WarehouseTransactionsPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        import: "",
        importRefunded: "",
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
                <h1 className="text-2xl font-semibold">Giao dịch kho</h1>

                <Tabs defaultValue="import" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="import">Phiếu nhập</TabsTrigger>
                        <TabsTrigger value="importRefunded">
                            Phiếu nhập hoàn trả
                        </TabsTrigger>
                        <TabsTrigger value="export">Phiếu xuất</TabsTrigger>
                        <TabsTrigger value="inventory">Kiểm kê</TabsTrigger>
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

                    <TabsContent value="importRefunded">
                        <ReceiptRefundedTable popup={toggleMenu} />

                        {popup.importRefunded !== "" &&
                            popup.mode === "detail" && (
                                <ReceiptRefundedDetailPopup
                                    id={popup.importRefunded}
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
