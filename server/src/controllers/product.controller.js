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

	// TODO: có lỗi j đó
	// [GET] product/stock/:id
	async getProductStock(req, res) {
		const { productID } = req.params;

		const productStock = await productService.getProductStock(productID);

		res.json({ availability: productStock });
	}
}

module.exports = new ProductController();
