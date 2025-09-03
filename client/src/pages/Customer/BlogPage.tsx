import { ListBlog, ListBlogCategory } from "@/features/blog/components";
import { Footer, Header, Section, TitleSection } from "@/layouts/Customer";

function BlogPage() {
    return (
        <div>
            <Header />

            <TitleSection text="Out Blog" />

            <Section>
                <div className="space-y-12">
                    <div className="space-y-2 text-center">
                        <p className="text-xl font-semibold">New & Blogs</p>

                        <h1 className="text-2xl font-bold md:text-3xl">
                            Our Latest
                            <span className="text-main-primary">
                                {" "}
                                New & Blogs
                            </span>
                        </h1>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex-3">
                            <ListBlog />
                        </div>

                        <div className="flex-1">
                            <ListBlogCategory />
                        </div>
                    </div>
                </div>
            </Section>

            <Footer />
        </div>
    );
}

export default BlogPage;
