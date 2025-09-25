const { ProfileStatus } = require("../constants/errorCode.constants");
const { Customer, Account, sequelize } = require("../models");
const { throwServerError } = require("../utils/errorThrowFunc");

class ProfileService {
	/**
	 * Lấy thông tin hồ sơ của khách hàng bằng ID
	 * @param {number} customer_id - ID của khách hàng
	 * @returns {Promise<Object>} Thông tin hồ sơ của khách hàng
	 */
	async getProfile(account_id) {
		const customer = await Account.findOne({
			include: [
				{
					model: Customer,
					attributes: [],
				},
			],
			attributes: [
				"email",
				[sequelize.col("Customer.first_name"), "first_name"],
				[sequelize.col("Customer.last_name"), "last_name"],
				[sequelize.col("Customer.phone_number"), "phone_number"],
			],
			where: { account_id },
		});

		return customer;
	}

	/**
	 * Lấy thông tin hồ sơ của khách hàng bằng SĐT
	 * @param {string} phone_number SĐT người dùng
	 * @returns {Promise<Object>} Thông tin hồ sơ của khách hàng
	 */
	async getProfileByPhone(phone_number) {
		const customer = await Customer.findOne({
			attributes: ["first_name", "last_name", "phone_number"],
			where: { phone_number },
			include: [
				{
					model: Account,
					attributes: ["username", "email"],
				},
			],
		});

		return customer;
	}

	async updateProfile(changes, account_id) {
		const transaction = await sequelize.transaction();

		try {
			const account = await Account.findOne({ where: { account_id } });
			const customer_id = account.customer_id;

			await Customer.update(
				{ ...changes },
				{ where: { customer_id }, transaction }
			);

			if (changes.email) {
				await Account.update(
					{ email: changes.email },
					{ where: { account_id }, transaction }
				);
			}

			await transaction.commit();

			return { message: "Update profile success", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError("Can't update profile", ProfileStatus.NOT_FOUND);
		}
	}
}

module.exports = new ProfileService();
