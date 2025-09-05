export type ItemFilter<T extends object> = {
    title: string;
    options: T[];
    optionsType: string;
    type?: "list" | "slide";
    idGetter: (item: T) => string | number;
    nameGetter: (item: T) => string;
};

export type FilterState = {
    category: string | null;
    // price: [string, string] |null;
    product_type: string | null;
    available: string | null;
};

export type SetListFilterPayload = {
    selectName: string;
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

export type SortOptions =
    | "latest"
    | "best"
    | "name decs"
    | "name up"
    | "oldest"
    | "Price Low To High"
    | "Price High To Low";

export type SortOptionsState = {
    option: SortOptions;
};
