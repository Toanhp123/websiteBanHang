export type User = {
    id: number;
    username: string;
    role: number;
};

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    phoneNumber: string;
};

export type UserRole = "admin" | "customer" | "employee";
