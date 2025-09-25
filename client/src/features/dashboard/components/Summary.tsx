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

    const { orderComplete, orderPending } = overview.orderStats.reduce(
        (acc, order) => {
            if (order.status === "paid") acc.orderComplete = order.count || 0;
            if (order.status === "pending") acc.orderPending = order.count || 0;
            return acc;
        },
        { orderComplete: 0, orderPending: 0 },
    );

    const totalOrder = orderComplete + orderPending;
    const avgOrder =
        totalOrder > 0 ? Math.round(overview.revenue / totalOrder) / 100 : 0;

    useEffect(() => {
        const handleGetOverview = async () => {
            const res = await getOverview();

            setOverview(res);
        };

        handleGetOverview();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <CardItem text="Tổng đơn hàng" value={totalOrder} />

            <CardItem text="Hoàn thành" value={orderComplete} />

            <CardItem text="Đang xử lý" value={orderPending} />

            <CardItem text="Doanh thu" value={overview.revenue} />

            <CardItem text="Đơn TB" value={avgOrder} />
        </div>
    );
}

export default Summary;
