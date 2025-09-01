import Loading from "@/features/loading/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = {
    allowedRoles: string[];
};

function RequireAuth({ allowedRoles }: RequireAuthProps) {
    const location = useLocation();
    const { loading, authorized, role } = useAuth();

    if (loading) return <Loading />;

    if (!authorized) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RequireAuth;
