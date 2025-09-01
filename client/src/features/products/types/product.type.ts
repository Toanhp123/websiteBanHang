import type {
    FilterState,
    SortOptions,
} from "@/features/filters/types/filter.type";

export interface Product {
    product_id: number;
    product_name: string;
    product_description: string | null;
    price: number;
    totalStock: number;
    category: string;
    type: string;
    images: ProductImage[];
}

export interface ProductDetail extends Product {
    status: string;
    supplier: string;
}

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

export type GetProductByConditionParams = {
    filterOption?: FilterState;
    option?: SortOptions;
};
