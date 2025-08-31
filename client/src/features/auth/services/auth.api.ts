import axios from "@/utils/axiosInstance";
import type {
    LoginCredentials,
    LoginResponse,
    RefreshResponse,
    RegisterCredentials,
    RegisterResponse,
    UserInfo,
} from "../types/auth.type";

/**
 * Hàm xử lý Login:
 * @param username tên đăng nhập
 * @param password mật khẩu đăng nhập
 * @returns trả về dữ liệu người dùng tương ứng kèm theo tin nhắn
 */
export const login = async ({
    username,
    password,
}: LoginCredentials): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>("/auth/login", {
        username,
        password,
    });

    return res.data;
};

/**
 * Hàm lấy access token nếu refresh token hợp lệ
 * @returns trả về access token mới
 */
export const refreshToken = async (): Promise<string> => {
    const res = await axios.post<RefreshResponse>(
        "/auth/refresh-token",
        {},
        {
            withCredentials: true, // Gửi cookie kèm theo
        },
    );
    const newAccessToken = res.data.accessToken;

    return newAccessToken;
};

/**
 * Hàm xử lý đăng ký người dùng:
 * @param user thông tin người dùng
 * @param registerCredentials tài khoản mật khẩu người dùng
 * @returns trả về thông báo đăng ký thành công
 */
export const register = async (
    user: UserInfo,
    registerCredentials: RegisterCredentials,
): Promise<RegisterResponse> => {
    const res = await axios.post<RegisterResponse>("/auth/register", {
        ...user,
        ...registerCredentials,
    });

    return res.data;
};

export const logout = async (): Promise<void> => {
    await axios.post(
        "/auth/logout",
        {},
        {
            withCredentials: true,
        },
    );
};
