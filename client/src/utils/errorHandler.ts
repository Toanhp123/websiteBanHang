import { getAccessToken } from "@/features/auth/services/auth.api";
import type { RetryRequestConfig } from "@/types/axiosType";
import { AxiosError } from "axios";
import axios from "@/utils/axiosInstance";
import { ErrorCode } from "@/constants/errorCode";

// TODO: cân làm hàm xử lý lỗi
// Có thể nhận thêm đối số như router nếu cần
export const handleApiError = async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;
    const err = error.response?.data || "Something went wrong";

    switch (error.response?.status) {
        case ErrorCode.UNAUTHORIZED:
            console.log(err);

            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const newAccessToken = await getAccessToken();

                    // Gắn lại access token mới vào request cũ
                    originalRequest.headers["Authorization"] =
                        `Bearer ${newAccessToken}`;

                    return axios(originalRequest);
                } catch (refreshError) {
                    console.log(refreshError);
                    console.error("Refresh thất bại, cần đăng nhập lại");

                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                }
            }

            break;
        case ErrorCode.BAD_REQUEST:
            return Promise.reject(err);
        default:
            return Promise.reject(err);
    }
};
