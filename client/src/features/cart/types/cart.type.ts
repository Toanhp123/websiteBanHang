export type ListCartState = {
    items: Cart[];
};

export type Cart = {
    id: number;
    product: string;
    quantity: number;
    price: number;
    img: string;
};
