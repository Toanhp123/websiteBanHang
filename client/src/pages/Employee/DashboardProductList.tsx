import { ProductManager } from "@/features/products/components";
import { MainLayout } from "@/layouts/Employee";

function DashboardProductList() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Product List</h1>

                <ProductManager />
            </div>
        </MainLayout>
    );
}

export default DashboardProductList;
