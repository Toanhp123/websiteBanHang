import type { Cart } from "@/features/cart/types/cart.type";

export type OrderState = {
    buyItem: Cart[] | null;
};

export type BillDetailState = {
    firstName: string;
    lastName: string;
    email: string;
    streetAddress: string;
    city: string;
    country: string;
    zipCode: string;
    phone: string;
    paymentMethod: string;
    promotion: string;
};
