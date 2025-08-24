const {
	Product,
	ProductCategory,
	Supplier,
	ProductStatus,
	ProductImage,
	ProductType,
	Inventory,
	sequelize,
} = require("../models");

class ProductService {
	/**
	 * Hàm lấy thông tin toàn bộ sản phẩm
	 * @return {Promise<Array>} danh sách sản phẩm
	 */
	async getProductByCondition(query) {
		const product = await Product.findAll({
			include: [
				{
					model: ProductCategory,
					attributes: [],
				},
				{
					model: Inventory,
					attributes: [],
				},
				{
					model: ProductType,
					attributes: [],
				},
				// {
				// 	model: Supplier,
				// },
				// {
				// 	model: ProductStatus,
				// },
				// {
				// 	model: ProductImage,
				// },
			],
			attributes: [
				"product_id",
				"product_name",
				"product_description",
				"price",
				[
					sequelize.fn("SUM", sequelize.col("Inventories.quantity")),
					"totalStock",
				],
				[
					sequelize.col("ProductCategory.product_category_name"),
					"category",
				],
				[sequelize.col("ProductType.product_type_name"), "type"],
			],
			group: ["Product.product_id"],
			where: query.where,
			having: query.having,
		});
		return product;
	}

	/**
	 * Hàm lấy thông tin category
	 * @returns {Promise<Array>} danh sách category
	 */
	async getCategories() {
		const categories = await ProductCategory.findAll();

		return categories;
	}

	/**
	 * Hàm lấy thông tin product type
	 * @returns {Promise<Array>} danh sách type
	 */
	async getProductType() {
		const productType = await ProductType.findAll();

		return productType;
	}

	/**
	 * Hàm lấy thông tin product status
	 * @returns {Promise<Array>} danh sách status
	 */
	async getProductStatus() {
		const productStatus = await ProductStatus.findAll();

		return productStatus;
	}

	/**
	 * Hàm lấy thông tin product stock
	 * @returns {Promise<number>} số lượng stock còn lại
	 */
	async getProductStock(product_id) {
		const productStock = await Inventory.findAll({
			where: { product_id: product_id },
		});

		const totalStock = productStock.reduce(
			(acc, item) => acc + item.quantity,
			0
		);

		return totalStock;
	}

	/**
	 * Hàm lấy thông tin sản phẩm mới nhất
	 * @return sản phẩm mới nhất
	 */
	async getLatestProduct() {
		const product = await Product.findAll({
			order: [["product_date_add", "DESC"]],
		});

		return product;
	}

	/**
	 * Hàm lấy thông tin sản phẩm bán chạy nhất
	 * @return sản phẩm bán chạy nhất
	 */
	async getBestSellerProduct() {
		// TODO: cần phải làm thêm
		const product = await Product.findAll({
			order: [["product_date_add", "DESC"]],
		});

		return product;
	}
}

module.exports = new ProductService();
