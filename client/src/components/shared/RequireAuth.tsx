import Loading from "@/features/loading/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const location = useLocation();
    const { loading, authorized } = useAuth();

    if (loading) return <Loading />;

    return authorized ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
