const { verifyToken } = require("../utils/token.util");
const { checkEmail } = require("../utils/validateUser.util");
const {
	TokenName,
	TokenType,
	AccountStatus,
	TokenStatus,
} = require("../constants/errorCode.constants");
const {
	throwBadRequest,
	throwUnauthorized,
} = require("../utils/errorThrowFunc");

const validateUserLogin = (req, res, next) => {
	const { username, password } = req.body;

	if (!username.trim()) {
		throwBadRequest("Missing username", AccountStatus.MISSING_USERNAME);
	}

	if (!password.trim()) {
		throwBadRequest("Missing password", AccountStatus.MISSING_PASSWORD);
	}

	if (username.trim().length < 6) {
		throwBadRequest(
			"Username length must have more than 5 character",
			AccountStatus.MISSING_USERNAME
		);
	}

	if (password.trim().length < 6) {
		throwBadRequest(
			"Password length must have more than 5 character",
			AccountStatus.MISSING_PASSWORD
		);
	}

	next();
};

const validateUserRegister = (req, res, next) => {
	const user = {
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		birthday: req.body.birthday,
		phoneNumber: req.body.phoneNumber,
	};

	if (!user.username.trim()) {
		throwBadRequest("Missing username", AccountStatus.MISSING_USERNAME);
	}

	if (!user.password.trim()) {
		throwBadRequest("Missing password", AccountStatus.MISSING_PASSWORD);
	}

	if (!user.firstName.trim()) {
		throwBadRequest("Missing first name", AccountStatus.MISSING_FIRST_NAME);
	}

	if (!user.lastName.trim()) {
		throwBadRequest("Missing last name", AccountStatus.MISSING_LAST_NAME);
	}

	if (checkEmail(user.email) === false) {
		throwBadRequest(
			"Email is incorrect format",
			AccountStatus.WRONG_EMAIL_FORMAT
		);
	}

	if (!user.birthday.trim()) {
		throwBadRequest("Missing birthday", AccountStatus.MISSING_BIRTHDAY);
	}

	if (!user.phoneNumber.trim()) {
		throwBadRequest("Missing phone number", AccountStatus.MISSING_PHONE);
	}

	if (user.username.trim().length < 6) {
		throwBadRequest(
			"Username length must have more than 5 character",
			AccountStatus.MISSING_USERNAME
		);
	}

	if (user.firstName.trim().length < 2) {
		throwBadRequest(
			"First name length must have more than 1 character",
			AccountStatus.MISSING_FIRST_NAME
		);
	}

	if (user.lastName.trim().length < 2) {
		throwBadRequest(
			"Last name length must have more than 1 character",
			AccountStatus.MISSING_LAST_NAME
		);
	}

	if (user.password.trim().length < 6) {
		throwBadRequest(
			"Password length must have more than 5 character",
			AccountStatus.MISSING_PASSWORD
		);
	}

	if (user.phoneNumber.trim().length < 11) {
		throwBadRequest(
			"Phone number length must have more than 10 character",
			AccountStatus.MISSING_PHONE
		);
	}

	req.user = user;

	next();
};

const checkAccessToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throwUnauthorized("Unauthorized", TokenStatus.NOT_PROVIDED);
	}

	const accessToken = {
		payload: authHeader.split(" ")[1],
		type: TokenName.ACCESS,
	};

	try {
		const decoded = verifyToken(accessToken);

		req.user = decoded;

		next();
	} catch {
		throwUnauthorized("Access token is invalid", TokenStatus.INVALID);
	}
};

const checkRefreshToken = (req, res, next) => {
	const refreshToken = {
		payload: req.cookies[TokenName.REFRESH],
		type: TokenType.REFRESH,
	};

	if (!refreshToken) {
		throwBadRequest("No refresh token", TokenStatus.NOT_PROVIDED);
	}

	if (!refreshToken.type) {
		throwBadRequest(
			"Refresh token does not have type",
			TokenStatus.INCORRECT_FORMAT
		);
	}

	if (refreshToken.type !== TokenType.REFRESH) {
		throwBadRequest(
			"This type is not refresh token",
			TokenStatus.INCORRECT_FORMAT
		);
	}

	try {
		const decoded = verifyToken(refreshToken);

		req.user = decoded;

		next();
	} catch {
		throwBadRequest("Refresh token is invalid", TokenStatus.INVALID);
	}
};

module.exports = {
	checkAccessToken,
	checkRefreshToken,
	validateUserLogin,
	validateUserRegister,
};
