export type ItemFilter<T extends object> = {
    title: string;
    options: T[];
    optionsType: string;
    type?: "list" | "slide";
    idGetter: (item: T) => string | number;
    nameGetter: (item: T) => string;
};

export interface FilterState {
    category: string | null;
    price: [string, string] | null;
    productType: string | null;
    available: string | null;
}

export type SetListFilterPayload = {
    selectName: string | null;
    optionsType: string;
};

export type DeleteFilterPayload = {
    optionsType: string;
};

export type ItemType = {
    product_type_id: number;
    product_type_name: string;
};

export type ItemTypeState = {
    type: string;
    itemType: ItemType[];
};
