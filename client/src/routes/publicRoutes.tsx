import { Route } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, ShopPage } from "@/pages";

const publicRoutes = (
    <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<HomePage />} />
    </>
);

export default publicRoutes;
