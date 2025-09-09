import { AddEmployeeForm } from "@/features/accounts/components";
import { MainLayout } from "@/layouts/Employee";

function EmployeeAdd() {
    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-2xl font-semibold">Add Employee</h1>

                <AddEmployeeForm />
            </div>
        </MainLayout>
    );
}

export default EmployeeAdd;
