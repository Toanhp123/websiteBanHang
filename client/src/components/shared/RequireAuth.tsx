import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const location = useLocation();

    return accessToken ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
