import { CardItem } from "@/components/shared";
import { useEffect } from "react";
import { getOverview } from "../services/dashboard.api";

function Overview() {
    useEffect(() => {
        const handleGetOverview = async () => {
            const res = await getOverview();
        };

        handleGetOverview();
    }, []);

    return (
        <div className="flex items-center justify-around gap-4">
            <CardItem
                text="Revenue"
                icon="fa-solid fa-dollar-sign"
                value="10"
            />

            <CardItem
                text="Orders"
                icon="fa-solid fa-bag-shopping"
                value="10"
            />

            <CardItem
                text="Products"
                icon="fa-solid fa-cart-shopping"
                value="10"
            />
        </div>
    );
}

export default Overview;
