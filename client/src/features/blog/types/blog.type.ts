export interface Blog {
    post_id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    author: string;
    category_name: string;
    category_slug: string;
    created_at: string;
    updated_at: string;
}

export type BlogCategory = {
    category_id: number;
    name: string;
    slug: string;
    description: string;
};
