import {
    OverviewSaleStatistics,
    Summary,
} from "@/features/dashboard/components";
import { MainLayout } from "@/layouts/Employee";

function DashboardHome() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-disable">
                        Whole data about your business here
                    </p>
                </div>

                <Summary />

                <OverviewSaleStatistics />
            </div>
        </MainLayout>
    );
}

export default DashboardHome;
