import type { Product } from "@/features/products/types/product.type";

export type OrderState = {
    buyNowItem: Product | null;
};
