import axios from "@/utils/axiosInstance";
import type {
    LoginCredentials,
    LoginResponse,
    RefreshResponse,
    RegisterResponse,
} from "../types/auth.type";
import type { RegisterFormInputs } from "../validations/register.schema";

/**
 * Hàm xử lý Login:
 * @param username tên đăng nhập
 * @param password mật khẩu đăng nhập
 * @returns trả về dữ liệu người dùng tương ứng kèm theo tin nhắn
 */
export const loginCustomer = async ({
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
export const registerCustomer = async (
    data: RegisterFormInputs,
): Promise<RegisterResponse> => {
    const res = await axios.post<RegisterResponse>("/auth/registerCustomer", {
        ...data,
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

export const checkEmailToGetOTP = async (email: string): Promise<boolean> => {
    const res = await axios.post("/auth/forgotPass/getOTP", { email });

    return res.data;
};

export const verifyOtp = async (
    email: string,
    otp: string,
): Promise<{ message: string; valid: string }> => {
    const res = await axios.post<{ message: string; valid: string }>(
        "/auth/forgotPass/checkOTP",
        { email, otp },
    );

    return res.data;
};

export const resetPassword = async (
    pass: string,
    email: string,
): Promise<{ message: string; valid: string }> => {
    const res = await axios.post("/account/reset", { pass, email });

    return res.data;
};
