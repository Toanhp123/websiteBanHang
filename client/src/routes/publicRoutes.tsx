import { Route } from "react-router-dom";
import {
    AboutUsPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    ProductDetailPage,
    RegisterPage,
    ShopPage,
} from "@/pages";
import BlogPage from "@/pages/BlogPage";

const publicRoutes = (
    <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

        <Route path="/blog" element={<BlogPage />} />

        <Route path="/shop" element={<ShopPage />} />

        <Route path="/aboutUs" element={<AboutUsPage />} />

        <Route
            path="/shop/productDetail/:product_id"
            element={<ProductDetailPage />}
        />

        <Route path="/" element={<HomePage />} />
    </>
);

export default publicRoutes;
