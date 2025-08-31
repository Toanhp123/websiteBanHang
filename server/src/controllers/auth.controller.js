const {
	COOKIE_EXPIRES_IN,
	COOKIE_EXPIRES_DAY_IN,
} = require("../configs/env.config");
const { TokenName } = require("../constants/errorCode.constants");
const { createCookie, deleteCookie } = require("../utils/cookie.util");

const authService = require("../services/auth.service");

class AuthController {
	// [POST] /auth/login
	async login(req, res) {
		const { username, password } = req.body;
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

		// Lấy thông tin người dùng nếu đăng nhập thành công
		const payload = await authService.login(username, password);

		// Tạo Cookie Refresh Token trả về client
		createCookie(
			res,
			TokenName.REFRESH,
			payload.refreshToken,
			true,
			COOKIE_EXPIRES_DAY_IN
		);

		// Tạo session log cho người dùng
		await authService.createSessionLog(payload.user.id, ip);

		// Trả Access Token về cho client
		res.status(200).json({
			message: "Login success",
			data: { user: payload.user, accessToken: payload.accessToken },
		});
	}

	// [POST] /auth/logout
	async logout(req, res) {
		console.log(1);

		const id = req.user.id;
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

		await authService.logout(id, ip);

		deleteCookie(res, TokenName.REFRESH);

		res.status(200).json({ message: "Logout success" });
	}

	// [POST] /auth/register
	async register(req, res) {
		const user = req.user;

		// Tạo tài khoản mới
		await authService.register(user);

		res.status(200).json({ message: "Register success" });
	}

	// [POST] /auth/refresh-token
	async getNewAccessToken(req, res) {
		const refreshToken = {
			payload: req.user,
		};
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

		// Tạo Access Token từ Refresh Token nếu hợp lệ
		const newAccessToken = await authService.refreshTokenHandler(
			refreshToken.payload,
			ip
		);

		res.status(200).json({
			message: "Create Access Token success",
			accessToken: newAccessToken,
		});
	}
}

module.exports = new AuthController();
