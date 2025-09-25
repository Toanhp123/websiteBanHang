import { InventoryListTable } from "@/features/warehouse/components";
import { MainLayout } from "@/layouts/Employee";

function InventoryListPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Kho hàng</h1>

                <InventoryListTable />
            </div>
        </MainLayout>
    );
}

export default InventoryListPage;
