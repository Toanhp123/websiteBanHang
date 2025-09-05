import type {
    FilterState,
    SortOptions,
} from "@/features/filters/types/filter.type";

export type Inventory = {
    warehouse_id: number;
    quantity: number;
};

export interface Product {
    product_id: number;
    product_name: string;
    product_description: string | null;
    price: number;
    totalStock: number;
    category: string;
    type: string;
    product_date_add: string;
    images: ProductImage[];
    Inventories: Inventory[];
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
    Inventories: Inventory[];
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

export type Warehouse = {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
    first_name: string;
    last_name: string;
    priority: number;
};

export type Supplier = {
    supplier_id: string;
    supplier_name: string;
};

export type WarehouseQuantity = {
    warehouse_id: number;
    quantity: number;
};
