import { EmployeeDetailPopup } from "@/features/accounts/components";
import EditEmployeePopup from "@/features/accounts/components/EditEmployeePopup";
import EmployeeListTable from "@/features/accounts/components/EmployeeListTable";
import { MainLayout } from "@/layouts/Employee";
import { useState } from "react";

function EmployeeListPage() {
    const [popup, setPopup] = useState<Record<string, string>>({
        employee: "",
    });

    const toggleMenu = (menu: string, value: string) => {
        setPopup((prev) => ({
            ...prev,
            [menu]: value,
        }));
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Employee List</h1>

                <EmployeeListTable id={popup.employee} popup={toggleMenu} />
            </div>

            {popup.employee.includes("Detail") && (
                <EmployeeDetailPopup id={popup.employee} popup={toggleMenu} />
            )}

            {popup.employee !== "" && !popup.employee.includes("Detail") && (
                <EditEmployeePopup id={popup.employee} popup={toggleMenu} />
            )}
        </MainLayout>
    );
}

export default EmployeeListPage;
