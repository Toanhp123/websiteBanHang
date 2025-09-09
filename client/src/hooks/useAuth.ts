import { refreshToken } from "@/features/auth/services/auth.api";
import type { UserRole } from "@/features/auth/types/auth.type";
import { getAccessToken, setAccessToken, setRole } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    username: string;
    role: UserRole;
    exp: number;
    iat: number;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const accessToken = getAccessToken();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let token = accessToken;

                if (!token) {
                    token = await refreshToken();
                    setAccessToken(token);
                }

                if (token) {
                    const decoded = jwtDecode<JwtPayload>(token);

                    setRole(decoded.role);
                    setAuthorized(true);
                } else {
                    setRole(null);
                    setAuthorized(false);
                }
            } catch (err) {
                console.log(err);

                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [accessToken]);

    return { loading, authorized };
};
