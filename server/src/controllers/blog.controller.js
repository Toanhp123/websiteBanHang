const blogService = require("../services/blog.service");

class BlogController {
	// [GET] /blog
	async getAllBlog(req, res) {
		const allBlog = await blogService.getAllBlog();

		return res.json(allBlog);
	}

	// [GET] /blog/category
	async getBlogCategory(req, res) {
		const allBlogCategory = await blogService.getBlogCategory();

		return res.json(allBlogCategory);
	}
}

module.exports = new BlogController();
