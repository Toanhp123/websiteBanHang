import { AddEmployeeScheduleForm } from "@/features/accounts/components";
import { MainLayout } from "@/layouts/Employee";

function AddEmployeeSchedulePage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">
                    Đăng ký lịch làm nhân viên
                </h1>

                <AddEmployeeScheduleForm />
            </div>
        </MainLayout>
    );
}

export default AddEmployeeSchedulePage;
