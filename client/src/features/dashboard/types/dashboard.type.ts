export type OrderStatus = {
    status: "paid" | "pending" | "cancelled";
    count: number;
};

export type Overview = {
    revenue: number;
    totalProducts: number;
    orderStats: OrderStatus[];
};
