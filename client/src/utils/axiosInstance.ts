import axios, { AxiosError, type AxiosInstance } from "axios";
import { handleApiError } from "./errorHandler";
import { getAccessToken } from "@/stores/authStore";

const instance: AxiosInstance = axios.create({
    baseURL: "https://websitebanhang-1.onrender.com/",
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
