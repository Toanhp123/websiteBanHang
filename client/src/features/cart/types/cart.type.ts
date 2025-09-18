import type { PromotionForProduct } from "@/features/discount/types/discount.type";
import type { Inventory } from "@/features/products/types/product.type";

export type ListCartState = {
    items: Cart[];
};

export type Cart = {
    id_product: number;
    product: string;
    quantity: number;
    price: number;
    img: string;
    Inventories: Inventory[];
    totalStock: number;
    discountPrice?: number;
    promotion?: PromotionForProduct;
};

export type CartUpdate = Pick<Cart, "id_product" | "quantity">;
