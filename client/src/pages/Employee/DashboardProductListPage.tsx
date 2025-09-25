import {
    DetailProductPopup,
    ProductManager,
} from "@/features/products/components";
import EditProduct from "@/features/products/components/EditProduct";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function DashboardProductListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        product: "",
        mode: "",
    });

    const toggleMenu = (values: Partial<Record<string, string>>) => {
        setPopup(
            (prev) =>
                ({
                    ...prev,
                    ...values,
                }) as Record<string, string>,
        );
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Danh sách Sản phẩm</h1>

                <ProductManager id={popup.product} popup={toggleMenu} />
            </div>

            {popup.mode === "detail" && (
                <DetailProductPopup id={popup.product} popup={toggleMenu} />
            )}

            {popup.mode === "edit" && (
                <EditProduct id={popup.product} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default DashboardProductListPage;
