const { Account, CartProduct, Cart } = require("../models");
const {
	CartStatus,
	AccountStatus,
	ProductStatus,
} = require("../configs/constants.config");
const {
	throwBadRequest,
	throwServerError,
} = require("../utils/errorThrowFunc");
const sequelize = require("../configs/database.config");

class AccountService {
	/**
	 * Hàm lấy thông tin tài khoản theo tên người dùng:
	 * @param {String} username tên người dùng
	 * @returns {Promise<Object>} Trả về thông tin tài khoản theo tên người dùng
	 */
	async getAccountByUsername(username) {
		const account = await Account.findOne({
			where: { username },
		});

		return account;
	}

	/**
	 * Hàm lấy thông tin tài khoản theo email người dùng:
	 * @param {String} email email người dùng
	 * @returns {Promise<Object>} Trả về thông tin tài khoản theo tên người dùng
	 */
	async getAccountByEmail(email) {
		const account = await Account.findAll({
			where: { email },
		});

		return account;
	}

	/**
	 * Hàm lấy thông tin tài khoản theo điều kiện truy vấn:
	 * @param {Object} query thông tin truy vấn để lọc tài khoản
	 * @returns {Promise<Array>} Trả về danh sách tài
	 */
	async getAccountByCondition(query) {
		const account = await Account.findAll({
			where: query,
		});

		return account;
	}

	/**
	 * Hàm lưu thông tin sản phẩm vào cart theo tài khoản
	 * @param {number} product_id id sản phẩm
	 * @param {number} quantity số lượng sản phẩm
	 * @param {number} account_id id tài khoản
	 * @returns {Promise<Array>} Trả về danh sách tài
	 */
	async putItemToCart(product_id, quantity, account_id) {
		if (!product_id || !quantity || !account_id) {
			throwBadRequest("Error Cart", CartStatus.ERROR_ITEM);
		}

		const res = await Account.findOne({
			where: { account_id },
			attributes: ["customer_id"],
		});

		const customer_id = res.dataValues.customer_id;
		const transaction = await sequelize.transaction();

		if (!customer_id) {
			throwBadRequest("Customer ID not found", AccountStatus.NOT_FOUND);
		}

		try {
			// Tạo Cart mới nếu chưa có
			const [cart] = await Cart.findOrCreate({
				where: { customer_id },
				transaction,
			});

			// Thêm sản phẩm vào giỏ hàng
			const [item, created] = await CartProduct.findOrCreate({
				where: {
					cart_id: cart.cart_id,
					product_id: product_id,
				},
				transaction,
			});

			if (!created) {
				item.quantity += quantity;
				await item.save({ transaction });
			}

			await transaction.commit();

			return cart;
		} catch (error) {
			await transaction.rollback();

			throwServerError(
				"Failed to add to cart",
				CartStatus.ERROR_ADD_TO_DATABASE
			);
		}
	}

	/**
	 * Hàm lấy item trong cart
	 * @param  account_id id tài khoản
	 * @returns trả về danh sách item trong cart
	 */
	async getCart(account_id) {
		if (!account_id) {
			throwBadRequest("ID account invalid", AccountStatus.NOT_FOUND);
		}

		const res = await Account.findOne({
			where: { account_id },
			attributes: ["customer_id"],
		});

		const customer_id = res.dataValues.customer_id;

		if (!customer_id) {
			throwBadRequest("Customer ID not found", AccountStatus.NOT_FOUND);
		}

		const cart = await Cart.findOne({
			where: { customer_id },
		});

		if (cart) {
			const query =
				"SELECT cp.quantity, p.product_id AS id_product, p.product_name AS product, pi.image_url AS img, p.price " +
				"FROM cart_product cp " +
				"INNER JOIN product p ON cp.product_id = p.product_id " +
				"LEFT JOIN product_image pi ON pi.product_id = p.product_id AND pi.is_main = TRUE " +
				"WHERE cp.cart_id = :cart_id";
			const cartItem = await sequelize.query(query, {
				replacements: { cart_id: cart.cart_id }, // gán giá trị cho :cart_id
				type: sequelize.QueryTypes.SELECT, // để trả về list object
			});

			// TODO: chưa bt giải quyết lỗi tại sao dùng attributes thì chỉ select 1 dữ liệu đã có giải pháp khác để lấy dữ liệu cách này có thể tìm cách giải quyết sau
			// const cartItem = await CartProduct.findAll({
			// 	include: [
			// 		{
			// 			model: Product,
			// 			attributes: [],
			// 			include: [
			// 				{
			// 					model: ProductImage,
			// 					attributes: [],
			// 					where: { is_main: true },
			// 				},
			// 			],
			// 		},
			// 	],
			// 	attributes: [
			// 		"quantity",
			// 		[sequelize.col("Product.product_id"), "id_product"],
			// 		[sequelize.col("Product.product_name"), "product"],
			// 		[sequelize.col("Product.ProductImages.image_url"), "img"],
			// 		[sequelize.col("Product.price"), "price"],
			// 	],
			// 	where: { cart_id: cart.cart_id },
			// });

			return cartItem;
		} else {
			return {};
		}
	}

	async deleteItemInCart(product_id) {
		if (!product_id) {
			throwBadRequest("ID account invalid", ProductStatus.ERROR_ITEM);
		}

		const res = await CartProduct.findOne({
			where: { product_id },
		});

		if (!res.dataValues) {
			throwBadRequest("Can't find product in cart", CartStatus.NOT_FOUND);
		}

		const cart_id = res.dataValues.cart_id;
		const transaction = await sequelize.transaction();

		try {
			await CartProduct.destroy(
				{
					where: { product_id: product_id },
				},
				{ transaction }
			);

			const cartProduct = await CartProduct.findAll({ transaction });

			if (cartProduct.length === 0) {
				await Cart.destroy(
					{
						where: { cart_id: cart_id },
					},
					{ transaction }
				);
			}

			transaction.commit();
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError(
				"Failed to delete item in cart",
				CartStatus.ERROR_DELETE_ITEM
			);
		}
	}
}

module.exports = new AccountService();
