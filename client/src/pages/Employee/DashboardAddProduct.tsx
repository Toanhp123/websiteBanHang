import { AddProductForm } from "@/features/products/components";
import { MainLayout } from "@/layouts/Employee";

function DashboardAddProduct() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Add New Product</h1>

                <AddProductForm />
            </div>
        </MainLayout>
    );
}

export default DashboardAddProduct;
