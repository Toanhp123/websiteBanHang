const productService = require("../services/product.service");

class ProductController {
	// [GET] product/
	async getAllProduct(req, res) {
		const product = await productService.getAllProduct();

		res.json(product);
	}

	// [GET] product/categories
	async getCategories(req, res) {
		const categories = await productService.getCategories();

		res.json(categories);
	}
}

module.exports = new ProductController();
