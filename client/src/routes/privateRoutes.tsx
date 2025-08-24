import { Route } from "react-router-dom";
import { RequireAuth } from "@/components/shared";
import { CartPage, CheckoutPage, MyAccount } from "@/pages";

const privateRoutes = (
    <Route element={<RequireAuth />}>
        <Route path="/myAccount" element={<MyAccount />} />

        <Route path="/cartShop" element={<CartPage />} />
        <Route path="/cartShop/checkout" element={<CheckoutPage />} />
    </Route>
);

export default privateRoutes;
