import { Route } from "react-router-dom";
import {
    HomePage,
    LoginPage,
    ProductDetailPage,
    RegisterPage,
    ShopPage,
} from "@/pages";

const publicRoutes = (
    <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/shop" element={<ShopPage />} />
        <Route
            path="/shop/productDetail/:product_id"
            element={<ProductDetailPage />}
        />

        <Route path="/" element={<HomePage />} />
    </>
);

export default publicRoutes;
