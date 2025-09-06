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
	Warehouse,
	Employee,
} = require("../models");
const { deleteImages } = require("../utils/deleteImage");
const {
	throwNotFoundError,
	throwConflictError,
	throwServerError,
} = require("../utils/errorThrowFunc");

class ProductService {
	/**
	 * Hàm lấy thông tin toàn bộ sản phẩm
	 * @return {Promise<Array>} danh sách sản phẩm
	 */
	async getProductByCondition(query) {
		// TODO: cần thêm thuật toán tính tiền để suy ra sản phẩm bán chạy
		const product = await Product.findAll({
			include: [
				{ model: ProductCategory, attributes: [] },
				{ model: ProductType, attributes: [] },
				{ model: Inventory, attributes: [] },
			],
			attributes: [
				"product_id",
				"product_name",
				"product_description",
				"price",
				"product_date_add",
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

		const inventories = await Inventory.findAll();

		if (!product) {
			throwNotFoundError(
				`Can't find item product`,
				ProductError.ERROR_ITEM
			);
		}

		const productsWithImageAndInventory = product.map((p) => {
			const imgs = productImage.filter(
				(img) => img.product_id === p.product_id
			);

			const Inventories = inventories.filter(
				(inv) => inv.product_id === p.product_id
			);

			return {
				...p.toJSON(),
				images: imgs,
				Inventories: Inventories,
			};
		});

		return productsWithImageAndInventory;
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

		const inventories = await Inventory.findAll({
			where: { product_id: product_id },
		});

		const productsWithImageAndInventory = {
			...productDetail.toJSON(),
			images: productImage,
			Inventories: inventories,
		};

		return productsWithImageAndInventory;
	}

	async getWarehouse() {
		const warehouse = Warehouse.findAll({
			include: [{ model: Employee, attributes: [] }],
			attributes: [
				"warehouse_id",
				"warehouse_name",
				"location",
				"priority",
				[sequelize.col("Employee.employee_first_name"), "first_name"],
				[sequelize.col("Employee.employee_last_name"), "last_name"],
			],
		});

		if (warehouse) return warehouse;
	}

	async getSupplier() {
		const supplier = Supplier.findAll();

		return supplier;
	}

	async addProduct(
		mainImage,
		subImages,
		product_name,
		product_description,
		product_category_id,
		price,
		supplier_id,
		product_type_id,
		parsedWarehouseQuantities,
		product_code
	) {
		const transaction = await sequelize.transaction();
		console.log(parsedWarehouseQuantities);

		try {
			const [product, created] = await Product.findOrCreate({
				where: { product_code: product_code },
				defaults: {
					product_name,
					product_description,
					price,
					product_status_id: 1,
					product_category_id,
					supplier_id,
					product_type_id,
					product_date_add: new Date(),
					product_code,
				},
				transaction,
			});

			if (!created) {
				deleteImages(mainImage, subImages);

				return { success: false, message: "Product already exists" };
			} else {
				const product_id = product.product_id;
				const mainImageURL = "uploads/images/" + mainImage.filename;
				const subImagesURL = subImages.map(
					(subImage) => "uploads/images/" + subImage.filename
				);

				await ProductImage.create(
					{ product_id, image_url: mainImageURL, is_main: true },
					{ transaction }
				);

				await Promise.all(
					subImagesURL.map(async (subImage) => {
						await ProductImage.create(
							{
								product_id,
								image_url: subImage,
								is_main: false,
							},
							{ transaction }
						);
					})
				);

				await Promise.all(
					parsedWarehouseQuantities.map(async (warehouseQuantity) => {
						await Inventory.create(
							{
								product_id,
								warehouse_id: warehouseQuantity.warehouse_id,
								quantity: warehouseQuantity.quantity,
								last_checked_at: new Date(),
							},
							{ transaction }
						);
					})
				);

				await transaction.commit();

				return {
					success: true,
					message: "Product created successfully",
				};
			}
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			deleteImages(mainImage, subImages);

			throwServerError("Can't add product", ProductError.ERROR_ITEM);
		}
	}
}

module.exports = new ProductService();
