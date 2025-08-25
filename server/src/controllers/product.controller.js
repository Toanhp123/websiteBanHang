const productService = require("../services/product.service");
const { ProductFilter } = require("../utils/search");

class ProductController {
	// [GET] product/
	async getProductByCondition(req, res) {
		const product = await productService.getProductByCondition(
			ProductFilter(req.query)
		);

		res.json(product);
	}

	// [GET] product/categories
	async getCategories(req, res) {
		const categories = await productService.getCategories();

		res.json(categories);
	}

	// [GET] product/type
	async getProductType(req, res) {
		const productType = await productService.getProductType();

		res.json(productType);
	}

	// [GET] product/status
	async getProductStatus(req, res) {
		const productStatus = await productService.getProductStatus();

		res.json(productStatus);
	}

	// [GET] product/stock/:id
	async getProductStock(req, res) {
		const { productID } = req.params;

		const productStock = await productService.getProductStock(productID);

		res.json({ availability: productStock });
	}
}

module.exports = new ProductController();
