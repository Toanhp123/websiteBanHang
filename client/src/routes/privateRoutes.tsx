import { Route } from "react-router-dom";
import { CartPage, CheckoutPage, MyAccountPage, OrderComplete } from "@/pages";
import { RequireAuth } from "@/components/shared";

const privateRoutes = (
    <Route element={<RequireAuth />}>
        <Route path="/myAccount" element={<MyAccountPage />} />

        <Route path="/cartShop" element={<CartPage />} />
        <Route path="/cartShop/checkout" element={<CheckoutPage />} />

        <Route path="/orderComplete" element={<OrderComplete />} />
    </Route>
);

export default privateRoutes;
