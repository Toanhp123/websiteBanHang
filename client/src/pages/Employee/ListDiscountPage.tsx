import {
    DiscountDetailForm,
    DiscountListTable,
} from "@/features/discount/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function ListDiscountPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        discount: "",
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
                <h1 className="text-2xl font-semibold">Danh sách khuyến mãi</h1>

                <DiscountListTable id={popup.discount} popup={toggleMenu} />

                {popup.mode === "detail" && (
                    <DiscountDetailForm
                        id={popup.discount}
                        popup={toggleMenu}
                    />
                )}
            </div>
        </MainLayout>
    );
}

export default ListDiscountPage;
