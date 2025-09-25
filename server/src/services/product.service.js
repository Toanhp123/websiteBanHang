const {
	ProductError,
	SupplierError,
} = require("../constants/errorCode.constants");
const { EffectPromotion } = require("../constants/promotion.constants");
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
	throwServerError,
} = require("../utils/errorThrowFunc");
const promotionService = require("./promotion.service");

class ProductService {
	/**
	 * Hàm lấy thông tin toàn bộ sản phẩm
	 * @return {Promise<Array>} danh sách sản phẩm
	 */
	async getProductByCondition(query) {
		// TODO: cần thêm thuật toán tính tiền để suy ra sản phẩm bán chạy
		const products = await Product.findAll({
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
				"is_delete",
				"product_category_id",
				[
					sequelize.literal(
						`SUM(CASE WHEN Inventories.is_active = true THEN Inventories.quantity ELSE 0 END)`
					),
					"totalStock",
				],
				[
					sequelize.col("ProductCategory.product_category_name"),
					"category",
				],
				[sequelize.col("ProductType.product_type_name"), "type"],
			],

			group: ["Product.product_id"],
			where: { ...query.where, is_delete: false },
			having: query.having,
			order: query.order,
			limit: query.limit,
			offset: query.offset,
			subQuery: false,
		});

		const total = await Product.count();

		if (!products) {
			throwNotFoundError(
				`Can't find item product`,
				ProductError.ERROR_ITEM
			);
		}

		// Phần này là lấy promotion cho product
		const productsPlain = products.map((p) => p.toJSON());
		const productIds = products.map((p) => p.product_id);
		const categoryIds = products.map((p) => p.product_category_id);

		let promotions = await promotionService.getPromotionForProducts(
			productIds,
			categoryIds
		);

		const productsWithPromotions = productsPlain.map((product) => {
			let price = Number(product.price);
			let appliedPromotion = null;

			for (const promo of promotions) {
				const appliesToProduct =
					promo.PromotionProducts?.product_id === product.product_id;
				const appliesToCategory =
					promo.PromotionCategory?.product_category_id ===
					product.product_category_id;

				if (
					(appliesToProduct || appliesToCategory) &&
					!appliedPromotion
				) {
					// Áp dụng effect
					if (
						promo.PromotionEffects.effect_type_id ==
						EffectPromotion.DISCOUNT_PERCENT
					) {
						price =
							price *
							(1 - promo.PromotionEffects.effect_value / 100);
					} else if (
						promo.PromotionEffects.effect_type_id ==
						EffectPromotion.DISCOUNT_AMOUNT
					) {
						price = price - promo.PromotionEffects.effect_value;
						price < 0 ? (price = 0) : (price = price);
					}
					appliedPromotion = promo;
				}

				// Nếu đã áp dụng promotion product, không cần check category nữa
				if (appliedPromotion && appliesToProduct) break;
			}

			return {
				...product,
				finalPrice: appliedPromotion ? price : null,
				promotion: appliedPromotion,
			};
		});
		// Kết thúc việc lấy promotion

		const productImage = await ProductImage.findAll({
			attributes: ["image_url", "is_main", "product_id"],
			where: { product_id: productIds },
		});

		const inventories = await Inventory.findAll({
			where: { product_id: productIds },
		});

		const productsWithPromotionsAndImageAndInventory =
			productsWithPromotions.map((p) => {
				const imgs = productImage.filter(
					(img) => img.product_id === p.product_id
				);

				const Inventories = inventories.filter(
					(inv) => inv.product_id === p.product_id
				);

				return {
					...p,
					images: imgs,
					Inventories: Inventories,
				};
			});

		return { data: productsWithPromotionsAndImageAndInventory, total };
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
				"product_category_id",
				"product_date_add",
				"price",
				[
					sequelize.literal(
						`SUM(CASE WHEN Inventories.is_active = true THEN Inventories.quantity ELSE 0 END)`
					),
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

		// Phần này là lấy promotion cho product
		const productsPlain = productDetail.toJSON();
		const productIds = productDetail.product_id;
		const categoryIds = productDetail.product_category_id;

		let promotions = await promotionService.getPromotionForProducts(
			productIds,
			categoryIds
		);

		let price = Number(productsPlain.price);
		let appliedPromotion = null;

		for (const promo of promotions) {
			const appliesToProduct =
				promo.PromotionProducts?.product_id ===
				productsPlain.product_id;
			const appliesToCategory =
				promo.PromotionCategory?.product_category_id ===
				productsPlain.product_category_id;

			if ((appliesToProduct || appliesToCategory) && !appliedPromotion) {
				// Áp dụng effect
				if (
					promo.PromotionEffects.effect_type_id ==
					EffectPromotion.DISCOUNT_PERCENT
				) {
					price =
						price * (1 - promo.PromotionEffects.effect_value / 100);
				} else if (
					promo.PromotionEffects.effect_type_id ==
					EffectPromotion.DISCOUNT_AMOUNT
				) {
					price = price - promo.PromotionEffects.effect_value;
					price < 0 ? (price = 0) : (price = price);
				}
				appliedPromotion = promo;
			}

			// Nếu đã áp dụng promotion product, không cần check category nữa
			if (appliedPromotion && appliesToProduct) break;
		}

		const productsWithPromotions = {
			...productsPlain,
			finalPrice: appliedPromotion ? price : null,
			promotion: appliedPromotion,
		};
		// Kết thúc lấy promotion

		const productImage = await ProductImage.findAll({
			attributes: ["image_url", "is_main", "product_id"],
			where: { product_id: product_id },
			order: [["is_main", "DESC"]],
		});

		const inventories = await Inventory.findAll({
			where: { product_id: product_id },
		});

		const productsWithPromotionsAndWithImageAndInventory = {
			...productsWithPromotions,
			images: productImage,
			Inventories: inventories,
		};

		return productsWithPromotionsAndWithImageAndInventory;
	}

	async getWarehouse() {
		const warehouse = await Warehouse.findAll({
			include: [{ model: Employee, attributes: [] }],
			attributes: [
				"warehouse_id",
				"warehouse_name",
				"location",
				"priority",
				[sequelize.col("Employee.employee_first_name"), "first_name"],
				[sequelize.col("Employee.employee_last_name"), "last_name"],
			],
			where: { is_active: true },
		});

		if (warehouse) return warehouse;
	}

	async getSupplier() {
		const supplier = await Supplier.findAll({
			where: { is_deleted: false },
		});

		return supplier;
	}

	async addProduct(mainImage, subImages, formData) {
		const transaction = await sequelize.transaction();

		try {
			const [product, created] = await Product.findOrCreate({
				where: {
					product_code: formData.product_code,
					is_delete: false,
				},
				defaults: {
					product_status_id: 1,
					product_date_add: new Date(),
					...formData,
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

				const allWarehouse = await Warehouse.findAll({
					where: { is_active: true },
				});

				await Promise.all(
					allWarehouse.map(async (warehouse) => {
						await Inventory.create(
							{
								product_id,
								warehouse_id: warehouse.warehouse_id,
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

	async deleteProduct(product_id) {
		const transaction = await sequelize.transaction();

		try {
			await Product.update(
				{ is_delete: true },
				{
					where: { product_id },
					transaction,
				}
			);

			transaction.commit();
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't delete product", ProductError.ERROR_ITEM);
		}
	}

	async getProductAdvancedInfo() {
		const warehouse = await Warehouse.findAll({
			include: [{ model: Employee, attributes: [] }],
			attributes: [
				"warehouse_id",
				"warehouse_name",
				"location",
				"priority",
				[sequelize.col("Employee.employee_first_name"), "first_name"],
				[sequelize.col("Employee.employee_last_name"), "last_name"],
			],
			where: { is_active: true },
		});

		const categories = await ProductCategory.findAll();
		const supplier = await Supplier.findAll();
		const productType = await ProductType.findAll();
		const productStatus = await ProductStatus.findAll();

		return { warehouse, categories, supplier, productType, productStatus };
	}

	async updateProduct(product_id, mainImage, subImages, formData) {
		const transaction = await sequelize.transaction();

		try {
			await Product.update(
				{
					...formData,
				},
				{ where: { product_id }, transaction }
			);

			if (mainImage) {
				const oldMainImage = await ProductImage.findOne({
					where: {
						product_id,
						is_main: true,
					},
				});

				deleteImages(oldMainImage, []);

				const mainImageURL = "uploads/images/" + mainImage.filename;

				await ProductImage.update(
					{
						image_url: mainImageURL,
					},
					{ where: { product_id, is_main: true }, transaction }
				);
			}

			// TODO: cần làm tiếp phần update ảnh
			// if (subImages.length > 0) {
			// 	deleteImages(null, subImages);

			// 	const subImagesURL = subImages.map(
			// 		(subImage) => "uploads/images/" + subImage.filename
			// 	);

			// 	await Promise.all(
			// 		subImagesURL.map(async (subImage) => {
			// 			await ProductImage.update(
			// 				{
			// 					image_url: subImage,
			// 				},
			// 				{
			// 					where: { product_id, is_main: false },
			// 					transaction,
			// 				}
			// 			);
			// 		})
			// 	);
			// }

			await transaction.commit();

			return {
				success: true,
				message: "Product update successfully",
			};
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			deleteImages(mainImage, subImages);

			throwServerError("Can't update product", ProductError.ERROR_ITEM);
		}
	}

	async addSupplier(data) {
		const transaction = await sequelize.transaction();

		try {
			const supplier = await Supplier.create(
				{ ...data },
				{ transaction }
			);

			transaction.commit();

			return supplier;
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't add supplier", SupplierError.ADD_ITEM);
		}
	}

	async getAllProductMinimal() {
		return Product.findAll({
			attributes: ["product_id", "product_name"],
		});
	}

	async getSupplierByID(supplier_id) {
		const supplier = await Supplier.findOne({ where: { supplier_id } });

		return supplier;
	}

	async updateSupplier(supplier_id, changes) {
		const transaction = await sequelize.transaction();

		try {
			await Supplier.update(
				{ supplier_name: changes.supplier_name },
				{ where: { supplier_id }, transaction }
			);

			transaction.commit();

			return {
				message: "Update Supplier success",
				success: true,
			};
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't update supplier", SupplierError.ADD_ITEM);
		}
	}

	async deleteSupplier(supplier_id) {
		const transaction = await sequelize.transaction();

		try {
			await Supplier.update(
				{ is_deleted: true },
				{ where: { supplier_id }, transaction }
			);

			await transaction.commit();

			return {
				message: "Delete supplier success",
				success: true,
			};
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError("Can't delete supplier", SupplierError.ADD_ITEM);
		}
	}
}

module.exports = new ProductService();
