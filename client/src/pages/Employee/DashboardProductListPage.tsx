import { ProductManager } from "@/features/products/components";
import EditProduct from "@/features/products/components/EditProduct";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function DashboardProductListPage() {
    const [popupEditProduct, setPopupEditProduct] = useState<boolean>(false);
    const [product, setProduct] = useState<number | null>(null);

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Product List</h1>

                <ProductManager
                    setPopup={setPopupEditProduct}
                    setProduct={setProduct}
                />
            </div>

            {popupEditProduct && (
                <EditProduct
                    product_id={product}
                    setPopup={setPopupEditProduct}
                />
            )}
        </MainLayout>
    );
}

export default DashboardProductListPage;
