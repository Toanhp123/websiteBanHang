import { refreshToken } from "@/features/auth/services/auth.api";
import { getAccessToken, setAccessToken } from "@/stores/authStore";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const accessToken = getAccessToken();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!accessToken) {
                    const newAccessToken = await refreshToken();

                    setAccessToken(newAccessToken);
                    setAuthorized(true);
                } else {
                    setAuthorized(true);
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
