export type OrderStatus = {
    status: "paid" | "pending" | "cancelled";
    count: number;
};

export type Overview = {
    revenue: number;
    totalProducts: number;
    orderStats: OrderStatus[];
};

export type RevenueData = {
    month: string;
    revenue: number;
};

export type ProductSaleData = {
    name: string;
    sales: number;
};

export type AccountCreatedData = {
    month: string;
    accountCreated: number;
};

export type SaleStatistics = {
    revenueByMonth: RevenueData[];
    productSaleData: ProductSaleData[];
    orderStatusData: OrderStatus[];
    accountCreatedData: AccountCreatedData[];
};
