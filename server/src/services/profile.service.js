const { Customer, Account } = require("../models");
const { ProfileStatus } = require("../configs/constants.config");

const AppError = require("../utils/errorCustom.util");

class ProfileService {
	/**
	 * Lấy thông tin hồ sơ của khách hàng bằng ID
	 * @param {number} customer_id - ID của khách hàng
	 * @returns {Promise<Object>} Thông tin hồ sơ của khách hàng
	 */
	async getProfile(customer_id) {
		const customer = await Customer.findOne({
			attributes: ["first_name", "last_name", "phone_number", "address"],
			where: { customer_id },
			include: [
				{
					model: Account,
					attributes: ["username", "email"],
				},
			],
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
			attributes: ["first_name", "last_name", "phone_number", "address"],
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
}

module.exports = new ProfileService();
