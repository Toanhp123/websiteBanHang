import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    AddWarehouseForm,
    WarehouseImportForm,
} from "@/features/warehouse/components";
import { MainLayout } from "@/layouts/Employee";

function WarehouseManagementPage() {
    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Quản lý kho</h1>

                <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">Thêm kho</TabsTrigger>
                        <TabsTrigger value="import">Nhập kho</TabsTrigger>
                    </TabsList>

                    <TabsContent value="list">
                        <AddWarehouseForm />
                    </TabsContent>

                    <TabsContent value="import">
                        <WarehouseImportForm />
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}

export default WarehouseManagementPage;
