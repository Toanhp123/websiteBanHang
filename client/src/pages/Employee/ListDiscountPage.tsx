import {
    DiscountDetailForm,
    DiscountListTable,
} from "@/features/discount/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function ListDiscountPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        discount: "",
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
                <h1 className="text-2xl font-semibold">Discount List</h1>

                <DiscountListTable id={popup.discount} popup={toggleMenu} />

                {popup.discount !== "" && (
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
