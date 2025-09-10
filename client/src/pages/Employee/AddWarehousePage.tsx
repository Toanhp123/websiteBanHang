import { AddWarehouseForm } from "@/features/warehouse/components";
import { MainLayout } from "@/layouts/Employee";

function AddWarehousePage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Add New Warehouse</h1>

                <AddWarehouseForm />
            </div>
        </MainLayout>
    );
}

export default AddWarehousePage;
