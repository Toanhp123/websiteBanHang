import { useEffect, useState } from "react";
import { getAllBlogByCondition } from "../services/blog.api";
import type { Blog } from "../types/blog.type";
import { formatDate } from "@/utils/formatDate";

function ListBlog() {
    const [listBlog, setListBlog] = useState<Blog[]>([]);

    useEffect(() => {
        const handleGetAllBlog = async () => {
            const res = await getAllBlogByCondition();

            setListBlog(res);
        };

        handleGetAllBlog();
    }, []);

    return (
        <div className="space-y-12">
            {listBlog.map((blog) => (
                <div
                    key={blog.post_id}
                    className="shadow-light overflow-hidden rounded-2xl"
                >
                    <div className="h-100 overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={`http://localhost:3000/${blog.thumbnail}`}
                            alt="image"
                        />
                    </div>

                    <div className="p-8">
                        <div className="flex items-center gap-4">
                            <p className="text-disable text-[18px] font-semibold">
                                {blog.author}
                            </p>
                            <div className="bg-primary h-3 w-3 rounded-full"></div>
                            <p className="text-disable text-[18px] font-semibold">
                                {formatDate(blog.updated_at)}
                            </p>
                        </div>

                        <h1 className="text-2xl font-semibold">{blog.title}</h1>

                        <p className="text-disable text-[18px]">
                            {blog.excerpt}
                        </p>

                        <div className="text-primary font-semibold underline underline-offset-4">
                            Read More
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListBlog;
