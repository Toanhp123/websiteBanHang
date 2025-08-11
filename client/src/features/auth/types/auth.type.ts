import type { User } from "@/types/authType";

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
