import { AddDiscountForm } from "@/features/discount/components";
import { MainLayout } from "@/layouts/Employee";

function AddDiscountPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Add New Discount</h1>

                <AddDiscountForm />
            </div>
        </MainLayout>
    );
}

export default AddDiscountPage;
