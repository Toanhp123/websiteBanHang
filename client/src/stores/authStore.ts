import type { UserRole } from "@/features/auth/types/auth.type";

let accessToken: string | null = null;
let role: UserRole | null = null;

export const setAccessToken = (token: string): void => {
    accessToken = token;
};

export const getAccessToken = (): string | null => {
    return accessToken;
};

export const clearAccessToken = (): void => {
    accessToken = null;
};

export const setRole = (roleValue: UserRole | null): void => {
    role = roleValue;
};

export const getRole = (): UserRole | null => {
    return role;
};

export const clearRole = (): void => {
    role = null;
};
