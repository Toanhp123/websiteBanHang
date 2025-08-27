import type { FilterState } from "@/features/filters/types/filter.type";

export type Product = {
    product_id: number;
    product_name: string;
    product_description: string | null;
    price: number;
    totalStock: number;
    category: string;
    type: string;
    images: ProductImage[];
};

export type ProductImage = {
    product_id: number;
    is_main: number;
    image_url: string;
};

export type ItemProductPros = {
    product_id: number;
    product_name: string;
    images: ProductImage[];
    price: number;
    category: string;
    totalStock: number;
};

export type ItemStock = {
    availability: number;
};

export type SlideListProductPros = {
    options: "latest" | "best sell";
};

export type SortOptions = "latest" | "name decs" | "name up";

export type GetProductByConditionParams = {
    filterOption?: FilterState;
    option?: SortOptions;
};
