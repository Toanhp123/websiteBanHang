const AppError = require("../utils/errorCustom.util");
const { ProductError } = require("../configs/constants.config");
const {
	Product,
	ProductType,
	Supplier,
	ProductStatus,
	ProductImage,
} = require("../models");

class ProductService {
	/**
	 * Hàm lấy thông tin toàn bộ sản phẩm
	 * @return {Promise<Array>} thông tin sản phẩm
	 */
	async getAllProduct() {
		const product = await Product.findAll({
			include: [
				{
					model: ProductType,
				},
				{
					model: Supplier,
				},
				{
					model: ProductStatus,
				},
				{
					model: ProductImage,
				},
			],
		});

		return product;
	}

	async getCategories() {
		const categories = await ProductType.findAll();

		return categories;
	}
}

module.exports = new ProductService();
