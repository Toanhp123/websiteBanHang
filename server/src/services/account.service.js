const {
	Account,
	AccountRole,
	CartProduct,
	Cart,
	Employee,
	EmployeePosition,
} = require("../models");
const {
	CartStatus,
	AccountStatus,
	ProductError,
	EmployeeError,
} = require("../constants/errorCode.constants");
const {
	throwBadRequest,
	throwServerError,
	throwNotFoundError,
} = require("../utils/errorThrowFunc");
const sequelize = require("../configs/database.config");
const {
	checkPassword,
	createPasswordHash,
} = require("../utils/validateUser.util");
const { getProductStock } = require("./product.service");

class AccountService {
	/**
	 * Hàm lấy thông tin tài khoản theo tên người dùng:
	 * @param {String} username tên người dùng
	 * @returns {Promise<Object>} Trả về thông tin tài khoản theo tên người dùng
	 */
	async getAccountByUsername(username) {
		const account = await Account.findOne({
			include: [{ model: AccountRole, attributes: [] }],
			attributes: [
				"account_id",
				"account_status",
				"username",
				"password_hash",
				"account_type",
				"employee_id",
				"customer_id",
				"email",
				"create_at",
				[sequelize.col("AccountRole.role_name"), "role_name"],
			],
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
		const account = await Account.findOne({
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
		if (!product_id || !account_id) {
			throwBadRequest("Error Cart", CartStatus.ERROR_ITEM);
		}

		const res = await Account.findOne({
			where: { account_id },
			attributes: ["customer_id"],
		});

		if (!res) {
			throwNotFoundError(
				"Customer ID not found",
				AccountStatus.NOT_FOUND
			);
		}

		const customer_id = res.dataValues.customer_id;
		const transaction = await sequelize.transaction();

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
				defaults: {
					quantity: quantity > 0 ? quantity : 1,
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

			console.log(error);

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

		if (!res) {
			throwNotFoundError(
				"Customer ID not found",
				AccountStatus.NOT_FOUND
			);
		}

		const customer_id = res.dataValues.customer_id;
		const cart = await Cart.findOne({
			where: { customer_id },
		});

		if (cart) {
			const query = `
			SELECT
    			cp.quantity,
    			p.product_id AS id_product,
    			p.product_name AS product,
    			pi.image_url AS img,
    			p.price,
    			JSON_ARRAYAGG(
        			JSON_OBJECT(
            			'warehouse_id', inv.warehouse_id,
            			'stock', inv.quantity
        			)
    			) AS Inventories
			FROM cart_product cp
				INNER JOIN product p
			    	ON cp.product_id = p.product_id
				LEFT JOIN product_image pi
			    	ON pi.product_id = p.product_id
			    	AND pi.is_main = TRUE
				LEFT JOIN inventory inv
			    	ON inv.product_id = p.product_id
			WHERE 
				cp.cart_id = :cart_id
			GROUP BY 
    			p.product_id, pi.image_url
			`;

			const cartItem = await sequelize.query(query, {
				replacements: { cart_id: cart.cart_id },
				type: sequelize.QueryTypes.SELECT,
			});

			const cartItemsWithStock = await Promise.all(
				cartItem.map(async (item) => {
					const totalStock = await getProductStock(item.id_product);

					return {
						...item,
						totalStock,
					};
				})
			);

			const cartItemFormat = cartItemsWithStock.map((p) => ({
				...p,
				price: parseFloat(p.price),
			}));

			return cartItemFormat;
		} else {
			return [];
		}
	}

	async deleteItemInCart(product_id) {
		if (!product_id) {
			throwBadRequest("ID account invalid", ProductError.ERROR_ITEM);
		}

		const res = await CartProduct.findOne({
			where: { product_id },
		});

		if (!res) {
			throwNotFoundError(
				"Can't find product in cart",
				CartStatus.NOT_FOUND
			);
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
				await Cart.destroy({
					where: { cart_id: cart_id },
					transaction,
				});
			}

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throwServerError(
				"Failed to delete item in cart",
				CartStatus.ERROR_DELETE_ITEM
			);
		}
	}

	async deleteCart(account_id) {
		const res = await Account.findOne({
			where: { account_id },
		});

		if (!res) {
			throwNotFoundError("Can't find account", AccountStatus.NOT_FOUND);
		}

		const customer_id = res.dataValues.customer_id;
		const transaction = await sequelize.transaction();

		try {
			await Cart.destroy({
				where: { customer_id: customer_id },
				transaction,
			});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throwServerError(
				"Failed to delete cart",
				CartStatus.ERROR_DELETE_ITEM
			);
		}
	}

	async changeQuantityItemCart(product_id, quantity) {
		const transaction = await sequelize.transaction();

		try {
			await CartProduct.update(
				{ quantity },
				{
					where: { product_id },
					transaction,
				}
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throwServerError(
				"Failed to update quantity item in cart",
				CartStatus.ERROR_UPDATE_QUANTITY
			);
		}
	}

	async changePassword(changePassword, account_id) {
		const transaction = await sequelize.transaction();
		const account = await Account.findOne({ where: { account_id } });
		const { pass, newPass, reNewPass } = changePassword;
		const pass_hash = account.dataValues.password_hash;

		const check = await checkPassword(pass, pass_hash);

		if (check && newPass === reNewPass) {
			try {
				const newPassHash = await createPasswordHash(newPass);
				await Account.update(
					{ password_hash: newPassHash },
					{ where: { account_id }, transaction }
				);

				await transaction.commit();
			} catch (error) {
				await transaction.rollback();

				console.log(error);

				throwServerError(
					"Can't update password",
					AccountStatus.ERROR_UPDATE_PASSWORD
				);
			}
		}
	}

	async resetPassword(pass, email) {
		const transaction = await sequelize.transaction();

		try {
			const newPassHash = await createPasswordHash(pass);
			await Account.update(
				{ password_hash: newPassHash },
				{ where: { email }, transaction }
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't update password",
				AccountStatus.ERROR_UPDATE_PASSWORD
			);
		}
	}

	async getAllEmployee() {
		const employee = await Employee.findAll({
			include: [
				{
					model: EmployeePosition,
					attributes: [],
				},
				{
					model: Account,
					attributes: [],
					include: [
						{
							model: AccountRole,
							attributes: [],
						},
					],
				},
			],
			attributes: [
				"employee_id",
				"employee_first_name",
				"employee_phone",
				"employee_birthday",
				"employee_address",
				"employee_hire_date",
				"employee_last_name",
				[
					sequelize.col("EmployeePosition.employee_position_name"),
					"employee_position_name",
				],
				[sequelize.col("Account.AccountRole.role_name"), "role_name"],
				[sequelize.col("Account.email"), "email"],
			],
			where: { is_active: true },
		});

		return employee;
	}

	async getEmployeeDetail(employee_id) {
		const employee = await Employee.findOne({
			include: [
				{
					model: EmployeePosition,
					attributes: [],
				},
				{
					model: Account,
					attributes: [],
					include: [
						{
							model: AccountRole,
							attributes: [],
						},
					],
				},
			],
			attributes: [
				"employee_id",
				"employee_first_name",
				"employee_phone",
				"employee_birthday",
				"employee_address",
				"employee_hire_date",
				"employee_last_name",
				[
					sequelize.col("EmployeePosition.employee_position_name"),
					"employee_position_name",
				],
				[sequelize.col("Account.AccountRole.role_name"), "role_name"],
				[sequelize.col("Account.username"), "username"],
				[sequelize.col("Account.email"), "email"],
			],
			where: { employee_id },
		});

		return employee;
	}

	async getAllPositionEmployee() {
		const position = await EmployeePosition.findAll();

		return position;
	}

	async updateEmployee(employee_id, changes) {
		const transaction = await sequelize.transaction();

		try {
			// Map các field thuộc bảng employee
			const employeeFields = {};
			if (changes.employee_first_name)
				employeeFields.employee_first_name =
					changes.employee_first_name;
			if (changes.employee_last_name)
				employeeFields.employee_last_name = changes.employee_last_name;
			if (changes.employee_phone)
				employeeFields.employee_phone = changes.employee_phone;
			if (changes.employee_birthday)
				employeeFields.employee_birthday = changes.employee_birthday;
			if (changes.employee_address)
				employeeFields.employee_address = changes.employee_address;
			if (changes.employee_position_id)
				employeeFields.employee_position_id =
					changes.employee_position_id;

			// Map các field thuộc bảng account
			const accountFields = {};
			if (changes.username) accountFields.username = changes.username;
			if (changes.password)
				accountFields.password_hash = await createPasswordHash(
					changes.accountPassword
				);
			if (changes.email) accountFields.email = changes.email;

			if (Object.keys(employeeFields).length > 0) {
				await Employee.update(employeeFields, {
					where: { employee_id: employee_id },
					transaction,
				});
			}

			if (Object.keys(accountFields).length > 0) {
				await Account.update(accountFields, {
					where: { employee_id: employee_id },
					transaction,
				});
			}

			await transaction.commit();

			return { message: "Employee updated successfully", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't update employee",
				EmployeeError.UPDATE_ERROR
			);
		}
	}

	async deleteEmployee(employee_id) {
		const transaction = await sequelize.transaction();

		try {
			await Account.update(
				{ account_status: "rejected" },
				{ where: { employee_id }, transaction }
			);

			await Employee.update(
				{ is_active: false },
				{ where: { employee_id }, transaction }
			);

			await transaction.commit();

			return { message: "delete employee success", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't delete employee",
				EmployeeError.DELETE_ERROR
			);
		}
	}

	async addEmployee(data) {
		const transaction = await sequelize.transaction();

		const password_hash = await createPasswordHash(data.password);

		try {
			const employee = await Employee.create(
				{
					employee_first_name: data.employee_first_name,
					employee_last_name: data.employee_last_name,
					employee_phone: data.employee_phone,
					employee_address: data.employee_address,
					employee_birthday: data.employee_birthday,
					employee_position_id: data.employee_position_id,
				},
				{ transaction }
			);

			const employee_id = employee.employee_id;

			await Account.create(
				{
					username: data.username,
					account_type: "employee",
					employee_id,
					role_id: 4,
					account_status: "approved",
					email: data.email,
					password_hash,
				},
				{ where: { employee_id }, transaction }
			);

			transaction.commit();

			return { message: "add employee success", success: true };
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't add employee", EmployeeError.ADD_ERROR);
		}
	}
}

module.exports = new AccountService();
