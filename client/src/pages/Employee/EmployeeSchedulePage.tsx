import { EmployeeScheduleTable } from "@/features/accounts/components";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function EmployeeSchedulePage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        employee: "",
        mode: "",
    });

    const toggleMenu = (values: Partial<Record<string, string>>) => {
        setPopup(
            (prev) =>
                ({
                    ...prev,
                    ...values,
                }) as Record<string, string>,
        );
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Lịch làm nhân viên</h1>

                <EmployeeScheduleTable id={popup.employee} popup={toggleMenu} />
            </div>
        </MainLayout>
    );
}

export default EmployeeSchedulePage;
