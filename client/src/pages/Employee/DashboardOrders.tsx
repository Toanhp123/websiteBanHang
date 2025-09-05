import { InvoiceManager } from "@/features/invoice/components";
import { MainLayout } from "@/layouts/Employee";

function DashboardOrders() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Order List</h1>

                <InvoiceManager />
            </div>
        </MainLayout>
    );
}

export default DashboardOrders;
