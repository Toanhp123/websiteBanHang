import { CustomerListTable } from "@/features/accounts/components";
import { MainLayout } from "@/layouts/Employee";

function CustomerListPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Customer List</h1>

                <CustomerListTable />
            </div>
        </MainLayout>
    );
}

export default CustomerListPage;
