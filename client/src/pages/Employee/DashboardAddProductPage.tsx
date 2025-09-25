import { AddProductForm } from "@/features/products/components";
import { MainLayout } from "@/layouts/Employee";

function DashboardAddProductPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Thêm Sản Phẩm Mới</h1>

                <AddProductForm />
            </div>
        </MainLayout>
    );
}

export default DashboardAddProductPage;
