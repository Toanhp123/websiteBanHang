export type Categories = {
    product_category_id: number;
    product_category_name: string;
};

export type ItemCategoriesPros = {
    img: string;
    name: string;
};

export interface CategoryState {
    type: string;
    categories: Categories[];
}
