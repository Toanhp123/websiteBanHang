import { AddDiscountForm } from "@/features/discount/components";
import { MainLayout } from "@/layouts/Employee";

function AddDiscountPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Thêm Khuyến Mãi Mới</h1>

                <AddDiscountForm />
            </div>
        </MainLayout>
    );
}

export default AddDiscountPage;
