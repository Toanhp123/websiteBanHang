import { AddEmployeeForm } from "@/features/accounts/components";
import { MainLayout } from "@/layouts/Employee";

function EmployeeAddPage() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Add Employee</h1>

                <AddEmployeeForm />
            </div>
        </MainLayout>
    );
}

export default EmployeeAddPage;
