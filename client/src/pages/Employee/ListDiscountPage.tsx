import { DiscountListTable } from "@/features/discount/components";
import { MainLayout } from "@/layouts/Employee";

function ListDiscountPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Discount List</h1>

                <DiscountListTable />
            </div>
        </MainLayout>
    );
}

export default ListDiscountPage;
