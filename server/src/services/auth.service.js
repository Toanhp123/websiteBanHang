const {
	checkPassword,
	createPasswordHash,
} = require("../utils/validateUser.util");
const { Account, Customer, SessionLog } = require("../models");
const {
	TokenStatus,
	AccountStatus,
} = require("../constants/errorCode.constants");
const { signAccessToken, signRefreshToken } = require("../utils/token.util");
const nodemailer = require("nodemailer");

const AppError = require("../utils/errorCustom.util");
const sequelize = require("../configs/database.config");
const accountService = require("../services/account.service");
const profileService = require("../services/profile.service");
const {
	throwNotFoundError,
	throwForbiddenError,
	throwBadRequest,
	throwServerError,
	throwConflictError,
} = require("../utils/errorThrowFunc");
const { EMAIL_USER, EMAIL_PASS } = require("../configs/env.config");

const otpStore = {};

class AuthService {
	/**
	 * Hàm đăng nhập:
	 * - Kiểm tra xem tài khoản có tồn tại không
	 * - Kiểm tra xem tài khoản có hoạt động không
	 * - Kiểm tra mật khẩu có đúng không
	 * - Tạo Access Token và Refresh Token từ thông tin người dùng
	 * @param {String} username - Tên đăng nhập của người dùng
	 * @param {String} password - Mật khẩu của người dùng
	 * @return {Promise<Object>} Trả về thông tin người dùng và token
	 */
	async loginCustomer(username, password) {
		const user = await accountService.getAccountByUsername(username);

		if (!user) {
			throwNotFoundError("Can't find user", AccountStatus.NOT_FOUND);
		} else if (user.account_status !== "approved") {
			throwForbiddenError(
				"Account is not active",
				AccountStatus.NOT_ACTIVE
			);
		}

		const customer_id = user.dataValues.customer_id;

		if (!customer_id) {
			throwNotFoundError("Can't find user", AccountStatus.NOT_FOUND);
		}

		const isPasswordCorrect = await checkPassword(
			password,
			user.password_hash
		);

		if (!isPasswordCorrect) {
			throwBadRequest(
				"Password is incorrect",
				AccountStatus.WRONG_PASSWORD
			);
		}

		const payload = {
			id: user.account_id,
			username: user.username,
			role: user.role_id,
		};

		// Tạo Access Token từ thông tin người dùng
		const accessToken = signAccessToken(payload);

		// Tạo Refresh Token từ thông tin người dùng
		const refreshToken = signRefreshToken(payload);

		return {
			accessToken,
			refreshToken,
			user: {
				id: user.account_id,
				username: user.username,
				role: user.role_id,
			},
		};
	}

	/**
	 * Hàm đăng xuất:
	 * - Tìm kiếm session log
	 * - Cập nhật session log để đánh dấu là không hợp lệ
	 * - Cập nhật thời gian đăng xuất
	 * @param {number} id - ID của người dùng
	 * @param {string} ip - Địa chỉ IP của người dùng
	 */
	async logout(id, ip) {
		const transaction = await sequelize.transaction();

		const checkSessionLog = await SessionLog.findOne({
			where: {
				account_id: id,
				ip_address: ip,
				isValid: true,
			},
		});

		if (!checkSessionLog) {
			throwNotFoundError(
				"Session log not found",
				AccountStatus.NOT_FOUND
			);
		}

		try {
			await SessionLog.update(
				{
					isValid: false,
					logout_time: new Date(),
				},
				{
					where: {
						account_id: id,
						ip_address: ip,
					},
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();

			throwServerError("Failed to logout", AccountStatus.ERROR);
		}
	}

	/**
	 * Hàm đăng ký:
	 * - Kiểm tra xem tài khoản đã tồn tại chưa
	 * - Kiểm tra xem email đã tồn tại chưa
	 * - Mã hóa mật khẩu
	 * - Tạo tài khoản mới
	 * @param {Object} user - Thông tin người dùng
	 */
	async registerCustomer(user) {
		const transaction = await sequelize.transaction();

		const checkUsername = await accountService.getAccountByUsername(
			user.username
		);
		const checkEmail = await accountService.getAccountByEmail(user.email);
		const checkPhone = await profileService.getProfileByPhone(
			user.phoneNumber
		);

		if (checkUsername) {
			throwConflictError(
				"Username already exists",
				AccountStatus.USERNAME_ALREADY_EXISTS
			);
		}

		if (checkEmail) {
			throwConflictError(
				"Email already exists",
				AccountStatus.EMAIL_ALREADY_EXITS
			);
		}

		if (checkPhone) {
			throwConflictError(
				"Phone number already exists",
				AccountStatus.PHONE_ALREADY_EXITS
			);
		}

		// Mã hóa mật khẩu
		const passwordHash = await createPasswordHash(user.password);

		try {
			// Tạo khách mới
			const newCustomer = await Customer.create(
				{
					first_name: user.firstName,
					last_name: user.lastName,
					phone_number: user.phoneNumber,
					customer_type_id: 1,
					customer_birthday: user.birthday,
				},
				{ transaction }
			);

			// Tạo tài khoản mới
			await Account.create(
				{
					username: user.username,
					password_hash: passwordHash,
					account_type: "customer",
					employee_id: null,
					customer_id: newCustomer.customer_id,
					role_id: 3,
					email: user.email,
					account_status: "approved",
					create_at: new Date(),
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();

			throwServerError("Failed to register", AccountStatus.ERROR);
		}
	}

	/**
	 * Hàm tạo session log:
	 * - Kiểm tra xem session log đã tồn tại chưa
	 * - Nếu chưa tồn tại thì tạo mới
	 * - Nếu đã tồn tại nhưng không hợp lệ thì cập nhật lại session log
	 * @param {number} id - ID của người dùng
	 * @param {string} ip - Địa chỉ IP của người dùng
	 */
	async createSessionLog(id, ip) {
		const transaction = await sequelize.transaction();

		const checkSessionLog = await SessionLog.findOne({
			where: {
				account_id: id,
				ip_address: ip,
			},
		});

		try {
			if (checkSessionLog === null) {
				await SessionLog.create(
					{
						account_id: id,
						login_time: new Date(),
						ip_address: ip,
						isValid: true,
					},
					{ transaction }
				);
			} else {
				if (checkSessionLog.isValid === false) {
					await SessionLog.update(
						{ isValid: true, login_time: new Date() },
						{
							where: {
								account_id: id,
								ip_address: ip,
								isValid: false,
							},
						},
						{ transaction }
					);
				}
			}

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();

			throwServerError(
				"Failed to create session log",
				AccountStatus.ERROR
			);
		}
	}

	/**
	 * Hàm kiểm tra session log:
	 * @param {number} id - ID của người dùng
	 * @param {string} ip - Địa chỉ IP của người dùng
	 * @return {boolean} Trả về true nếu session log hợp lệ, false nếu không hợp lệ
	 */
	async checkRefreshTokenSession(id, ip) {
		const checkSessionLog = await SessionLog.findOne({
			where: {
				account_id: id,
				ip_address: ip,
				isValid: true,
			},
		});

		if (!checkSessionLog) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Hàm tạo Access Token nếu Refresh Token hợp lệ:
	 * - Kiểm tra xem session log của refresh token có hợp lệ không
	 * - Nếu hợp lệ thì tạo Access Token mới
	 * @param {Object} payload - Payload của Refresh Token
	 * @param {string} ip - Địa chỉ IP của người dùng
	 * @return {Promise<string>} Trả về Access Token mới
	 */
	async refreshTokenHandler(payload, ip) {
		// Check xem session refresh token có hợp lệ không
		const checkRefreshToken = await this.checkRefreshTokenSession(
			payload.id,
			ip
		);

		if (!checkRefreshToken) {
			throw new AppError("Refresh token is invalid", {
				statusCode: 403,
				errorCode: TokenStatus.INVALID,
			});
		}

		// Tạo access token mới
		const newAccessToken = signAccessToken({
			id: payload.id,
			username: payload.username,
			role: payload.role_id,
		});

		return newAccessToken;
	}

	async checkEmailToGetOTP(email) {
		const res = await accountService.getAccountByEmail(email);
		const customer_id = res.dataValues.customer_id;

		if (res && customer_id) {
			const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 số
			const expires = Date.now() + 5 * 60 * 1000; // 5 phút

			otpStore[email] = { code: otp, expires };

			// config transporter
			const transporter = nodemailer.createTransport({
				service: "gmail", // hoặc SMTP server riêng
				auth: {
					user: EMAIL_USER,
					pass: EMAIL_PASS,
				},
			});

			await transporter.sendMail({
				from: process.env.EMAIL_USER,
				to: email,
				subject: "Mã OTP xác thực",
				text: `Mã OTP của bạn là: ${otp} (hết hạn sau 5 phút)`,
			});

			return true;
		} else {
			return false;
		}
	}

	async verifyOtp(email, otp) {
		const record = otpStore[email];

		if (!record) return { message: "Chưa gửi OTP" };
		if (Date.now() > record.expires)
			return { message: "OTP đã hết hạn", valid: false };
		if (record.code !== otp)
			return { message: "OTP không đúng", valid: false };

		// ✅ OTP hợp lệ
		delete otpStore[email]; // xoá cho an toàn
		return { message: "Xác thực thành công", valid: true };
	}
}

module.exports = new AuthService();
