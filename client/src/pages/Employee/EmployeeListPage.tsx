import { EmployeeDetailPopup } from "@/features/accounts/components";
import EditEmployeePopup from "@/features/accounts/components/EditEmployeePopup";
import EmployeeListTable from "@/features/accounts/components/EmployeeListTable";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function EmployeeListPage() {
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
                <h1 className="text-2xl font-semibold">Danh sách nhân viên</h1>

                <EmployeeListTable id={popup.employee} popup={toggleMenu} />
            </div>

            {popup.mode === "Detail" && (
                <EmployeeDetailPopup id={popup.employee} popup={toggleMenu} />
            )}

            {popup.mode === "Edit" && (
                <EditEmployeePopup id={popup.employee} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default EmployeeListPage;
