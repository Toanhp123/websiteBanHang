import { Route } from "react-router-dom";
import {
    CartPage,
    CheckoutPage,
    MyAccountPage,
    OrderComplete,
} from "@/pages/Customer";
import { RequireAuth } from "@/components/shared";
import {
    DashboardHome,
    DashboardOrders,
    DashboardProduct,
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
            <Route path="/dashboard" element={<DashboardHome />} />
        </Route>

        {/* Route cho employee và admin */}
        <Route element={<RequireAuth allowedRoles={["Admin", "Employee"]} />}>
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route path="/dashboard/product" element={<DashboardProduct />} />
        </Route>
    </>
);

export default privateRoutes;
