import axios, { AxiosError, type AxiosInstance } from "axios";
import { handleApiError } from "./errorHandler";
import { getAccessToken } from "@/stores/authStore";

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

// Interceptor: Gắn token vào mỗi request
instance.interceptors.request.use(
    (config) => {
        const token: string | null = getAccessToken();

        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    async (error: AxiosError) => {
        return handleApiError(error);
    },
);

// Interceptor: Bắt lỗi và xử lý tự động
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        return handleApiError(error);
    },
);

export default instance;
