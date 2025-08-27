export type ListCartState = {
    items: Cart[];
};

export type Cart = {
    id_product: number;
    product: string;
    quantity: number;
    price: number;
    img: string;
};

export type CartUpdate = Pick<Cart, "id_product" | "quantity">;
