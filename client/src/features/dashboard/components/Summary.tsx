import { CardItem } from "@/components/shared";
import { useEffect, useState } from "react";
import { getOverview } from "../services/dashboard.api";
import type { Overview } from "../types/dashboard.type";

function Summary() {
    const [overview, setOverview] = useState<Overview>({
        revenue: 0,
        totalProducts: 0,
        orderStats: [],
    });
    const orderComplete = overview.orderStats.filter(
        (order) => order.status === "paid",
    );

    useEffect(() => {
        const handleGetOverview = async () => {
            const res = await getOverview();

            setOverview(res);
        };

        handleGetOverview();
    }, []);

    return (
        <div className="flex items-center justify-around gap-4">
            <CardItem
                text="Revenue"
                icon="fa-solid fa-dollar-sign"
                value={overview.revenue}
            />

            <CardItem
                text="Orders"
                icon="fa-solid fa-bag-shopping"
                value={orderComplete[0]?.count | 0}
            />

            <CardItem
                text="Products"
                icon="fa-solid fa-cart-shopping"
                value={overview.totalProducts}
            />
        </div>
    );
}

export default Summary;
