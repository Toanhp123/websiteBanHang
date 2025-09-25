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

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#2196F3"];

function OverviewSaleStatistics() {
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

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <h1 className="text-xl font-semibold">Thống kê bán hàng</h1>

            <div className="flex gap-8">
                {/* Doanh thu */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Doanh thu theo thời gian
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={saleStatistics.revenueByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                formatter={(value) => {
                                    if (value === "revenue") return "Doanh thu";
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

                {/* Sản phẩm bán chạy */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Sản phẩm bán chạy
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
                                        return "Số lượng bán";
                                    return value;
                                }}
                            />
                            <Bar dataKey="total_sold" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Trạng thái đơn hàng */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Phân bố trạng thái đơn hàng
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Legend
                                formatter={(value) => {
                                    if (value === "cancelled") return "Đã hủy";
                                    if (value === "paid")
                                        return "Đã thanh toán";
                                    if (value === "pending") return "Chờ xử lý";
                                    if (value === "refunded")
                                        return "Hoàn tiền";
                                    if (value === "refund_requested")
                                        return "Yêu cầu hoàn tiền";
                                    if (value === "refund_rejected")
                                        return "Từ chối hoàn tiền";
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

                {/* Khách hàng mới */}
                <div className="flex-1 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Khách hàng mới
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
                                        return "Tài khoản mới";
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

export default OverviewSaleStatistics;
