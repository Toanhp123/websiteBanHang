import axios from "@/utils/axiosInstance";
import type { Blog, BlogCategory } from "../types/blog.type";

export const getAllBlogByCondition = async (): Promise<Blog[]> => {
    const res = await axios.get<Blog[]>("blog");

    return res.data;
};

export const getBlogCategory = async (): Promise<BlogCategory[]> => {
    const res = await axios.get<BlogCategory[]>("blog/category");

    return res.data;
};
