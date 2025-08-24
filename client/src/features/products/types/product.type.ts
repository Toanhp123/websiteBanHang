export type Product = {
    product_id: number;
    product_name: string;
    product_description: string | null;
    price: number;
    totalStock: number;
    category: string;
};

export type ItemProductPros = {
    name: string;
    img: string;
    price: number;
    category: string;
    totalStock: number;
};

export type ItemStock = {
    availability: number;
};
