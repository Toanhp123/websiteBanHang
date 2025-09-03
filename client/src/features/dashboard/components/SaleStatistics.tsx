import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { getSaleStatistics } from "../services/dashboard.api";
import type { SaleStatistics } from "../types/dashboard.type";
import Loading from "@/features/loading/components/Loading";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

function SaleStatistics() {
    const [loading, setLoading] = useState(false);
    const [saleStatistics, setSaleStatistics] = useState<SaleStatistics>({
        revenueByMonth: [],
        productSaleData: [],
        orderStatusData: [],
        accountCreatedData: [],
    });

    useEffect(() => {
        const handleGetSaleStatistics = async () => {
            try {
                setLoading(true);

                const res = await getSaleStatistics();
                if (res) {
                    setSaleStatistics(res);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        handleGetSaleStatistics();
    }, []);

    console.log(saleStatistics);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <h1 className="text-xl font-semibold">Sale Statistics</h1>

            <div className="flex gap-8">
                {/* Revenue Line Chart */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Revenue Over Time
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={saleStatistics.revenueByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                formatter={(value) => {
                                    if (value === "revenue") return "Revenue";
                                    return value;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#4F46E5"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Top Selling Products
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={saleStatistics.productSaleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="product_name" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                formatter={(value) => {
                                    if (value === "total_sold")
                                        return "Total Sold";
                                    return value;
                                }}
                            />
                            <Bar dataKey="total_sold" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Order Status Pie */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Order Status Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Legend
                                formatter={(value) => {
                                    if (value === "cancelled")
                                        return "Cancelled";
                                    if (value === "paid") return "Paid";
                                    if (value === "pending") return "Pending";
                                    if (value === "refunded") return "Refunded";
                                    return value;
                                }}
                            />
                            <Pie
                                data={saleStatistics.orderStatusData}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {saleStatistics.orderStatusData.map(
                                    (_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index]}
                                        />
                                    ),
                                )}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Customers Area Chart */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        New Customers
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={saleStatistics.accountCreatedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                formatter={(value) => {
                                    if (value === "total_accounts")
                                        return "Total Account Created";
                                    return value;
                                }}
                            />
                            <Bar dataKey="total_accounts" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default SaleStatistics;
