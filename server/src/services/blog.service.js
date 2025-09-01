const { Blog, BlogCategory, Account } = require("../models");
const sequelize = require("../configs/database.config");

class BlogService {
	async getAllBlog() {
		const allBlog = await Blog.findAll({
			include: [
				{
					model: BlogCategory,
					attributes: [],
				},
				{
					model: Account,
					attributes: [],
				},
			],
			attributes: [
				"post_id",
				"title",
				"slug",
				"content",
				"excerpt",
				"thumbnail",
				"created_at",
				"updated_at",

				// 	// blog_category
				[sequelize.col("BlogCategory.name"), "category_name"],
				[sequelize.col("BlogCategory.slug"), "category_slug"],

				// account
				[sequelize.col("Account.username"), "author"],
			],
			where: { status: "published" },
		});

		return allBlog;
	}

	async getBlogCategory() {
		const allBlogCategory = await BlogCategory.findAll();

		return allBlogCategory;
	}
}

module.exports = new BlogService();
