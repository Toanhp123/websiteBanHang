import { ProductManager } from "@/features/products/components";
import EditProduct from "@/features/products/components/EditProduct";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function DashboardProductListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        product: "",
    });

    const toggleMenu = (menu: string, value: string) => {
        setPopup((prev) => ({
            ...prev,
            [menu]: value,
        }));
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Product List</h1>

                <ProductManager id={popup.product} popup={toggleMenu} />
            </div>

            {popup.product !== "" && (
                <EditProduct id={popup.product} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default DashboardProductListPage;
