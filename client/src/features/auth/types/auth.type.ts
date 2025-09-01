export type ResponseData = {
    accessToken: string;
    user: User;
};

export type LoginResponse = {
    data: ResponseData;
    message: string;
};

export type RegisterResponse = {
    message: string;
};

export type RefreshResponse = {
    accessToken: string;
    message: string;
};

export type LoginCredentials = {
    username: string;
    password: string;
};

export type RegisterCredentials = {
    username: string;
    password: string | undefined;
};

export type AuthState = {
    accessToken: string | null;
};

export type User = {
    id: number;
    username: string;
    role: number;
};

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    phoneNumber: string;
};

export type UserRole = "Admin" | "Customer" | "Employee";

export const isUserRole = (role: unknown): role is UserRole => {
    return role === "Admin" || role === "Customer" || role === "Employee";
};
