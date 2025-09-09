import { Route } from "react-router-dom";
import {
    CartPage,
    CheckoutPage,
    MyAccountPage,
    OrderComplete,
} from "@/pages/Customer";
import { RequireAuth } from "@/components/shared";
import {
    AddWarehouse,
    DashboardAddProduct,
    DashboardHome,
    DashboardOrders,
    DashboardProductList,
    EmployeeAdd,
    EmployeeList,
    WarehouseTransactions,
} from "@/pages/Employee";
import WarehouseList from "@/pages/Employee/WarehouseList";
import SupplierList from "@/pages/Employee/SupplierList";

const privateRoutes = (
    <>
        {/* Route cho customer */}
        <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
            <Route path="/myAccount" element={<MyAccountPage />} />

            <Route path="/cartShop" element={<CartPage />} />
            <Route path="/cartShop/checkout" element={<CheckoutPage />} />

            <Route path="/orderComplete" element={<OrderComplete />} />
        </Route>

        {/* Route cho admin */}
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/dashboard" element={<DashboardHome />} />

            <Route path="/dashboard/employeeAdd" element={<EmployeeAdd />} />
        </Route>

        {/* Route cho employee và admin */}
        <Route element={<RequireAuth allowedRoles={["Admin", "Employee"]} />}>
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route
                path="/dashboard/productList"
                element={<DashboardProductList />}
            />
            <Route
                path="/dashboard/addProduct"
                element={<DashboardAddProduct />}
            />
            <Route
                path="/dashboard/warehouseTransactions"
                element={<WarehouseTransactions />}
            />
            <Route
                path="/dashboard/warehouseList"
                element={<WarehouseList />}
            />
            <Route path="/dashboard/supplierList" element={<SupplierList />} />

            <Route path="/dashboard/addWarehouse" element={<AddWarehouse />} />

            <Route path="/dashboard/employeeList" element={<EmployeeList />} />
        </Route>
    </>
);

export default privateRoutes;
