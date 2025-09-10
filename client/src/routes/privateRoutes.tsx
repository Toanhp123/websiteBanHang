import { Route } from "react-router-dom";
import {
    CartPage,
    CheckoutPage,
    MyAccountPage,
    OrderComplete,
} from "@/pages/Customer";
import { RequireAuth } from "@/components/shared";
import {
    AddDiscountPage,
    AddWarehousePage,
    CustomerListPage,
    DashboardAddProductPage,
    DashboardHomePage,
    DashboardOrdersPage,
    DashboardProductListPage,
    EmployeeAddPage,
    EmployeeListPage,
    SupplierListPage,
    WarehouseListPage,
    WarehouseTransactionsPage,
} from "@/pages/Employee";

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
            <Route
                path="/dashboard/employeeAdd"
                element={<EmployeeAddPage />}
            />
        </Route>

        {/* Route cho employee và admin */}
        <Route element={<RequireAuth allowedRoles={["Admin", "Employee"]} />}>
            <Route path="/dashboard/orders" element={<DashboardOrdersPage />} />
            <Route
                path="/dashboard/productList"
                element={<DashboardProductListPage />}
            />
            <Route
                path="/dashboard/addProduct"
                element={<DashboardAddProductPage />}
            />
            <Route
                path="/dashboard/warehouseTransactions"
                element={<WarehouseTransactionsPage />}
            />
            <Route
                path="/dashboard/warehouseList"
                element={<WarehouseListPage />}
            />
            <Route
                path="/dashboard/supplierList"
                element={<SupplierListPage />}
            />

            <Route
                path="/dashboard/addWarehouse"
                element={<AddWarehousePage />}
            />

            <Route
                path="/dashboard/employeeList"
                element={<EmployeeListPage />}
            />

            <Route path="/dashboard/customer" element={<CustomerListPage />} />

            <Route
                path="/dashboard/discountAdd"
                element={<AddDiscountPage />}
            />

            <Route path="/dashboard" element={<DashboardHomePage />} />
        </Route>
    </>
);

export default privateRoutes;
