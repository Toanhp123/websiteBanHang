import { Route } from "react-router-dom";
import { CartPage, CheckoutPage, MyAccountPage, OrderComplete } from "@/pages";
import { RequireAuth } from "@/components/shared";

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
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}></Route>
    </>
);

export default privateRoutes;
