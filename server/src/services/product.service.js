const { ProductError } = require("../constants/errorCode.constants");
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
const { throwNotFoundError } = require("../utils/errorThrowFunc");

class ProductService {
	/**
	 * Hàm lấy thông tin toàn bộ sản phẩm
	 * @return {Promise<Array>} danh sách sản phẩm
	 */
	async getProductByCondition(query) {
		// TODO: cần thêm thuật toán tính tiền để suy ra sản phẩm bán chạy
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
			order: query.order,
		});

		const productImage = await ProductImage.findAll({
			attributes: ["image_url", "is_main", "product_id"],
		});

		if (!product) {
			throwNotFoundError(
				`Can't find item product`,
				ProductError.ERROR_ITEM
			);
		}

		const productsWithImage = product.map((p) => {
			const imgs = productImage.filter(
				(img) => img.product_id === p.product_id
			);

			return {
				...p.toJSON(),
				images: imgs,
			};
		});

		return productsWithImage;
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
	 * Hàm lấy thông tin chi tiết product
	 * @returns chi tiết sản phẩm
	 */
	async getProductByID(product_id) {
		const productDetail = await Product.findOne({
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
				{
					model: ProductStatus,
					attributes: [],
				},
				{
					model: Supplier,
					attributes: [],
				},
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
				[sequelize.col("ProductStatus.product_status_name"), "status"],
				[sequelize.col("Supplier.supplier_name"), "supplier"],
			],
			group: ["Product.product_id"],
			where: { product_id: product_id },
		});

		if (!productDetail) {
			throwNotFoundError(
				`Can't find item product`,
				ProductError.ERROR_ITEM
			);
		}

		const productImage = await ProductImage.findAll({
			attributes: ["image_url", "is_main", "product_id"],
			where: { product_id: product_id },
		});

		const productsWithImage = {
			...productDetail.toJSON(),
			images: productImage,
		};

		return productsWithImage;
	}
}

module.exports = new ProductService();
