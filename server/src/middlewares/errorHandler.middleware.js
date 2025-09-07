const {
	TokenStatus,
	CookieStatus,
	AccountStatus,
	ProfileStatus,
	CartStatus,
	ProductError,
	BillError,
	WarehouseError,
} = require("../constants/errorCode.constants");

const AppError = require("../utils/errorCustom.util");

const errorHandler = (err, req, res, next) => {
	const isAppError = err instanceof AppError;

	const knownErrorCodes = [
		TokenStatus.EXPIRED,
		TokenStatus.INVALID,
		TokenStatus.INCORRECT_FORMAT,
		TokenStatus.NOT_PROVIDED,

		CookieStatus.ERROR_SIGN,

		AccountStatus.ERROR,
		AccountStatus.NOT_FOUND,
		AccountStatus.NOT_ACTIVE,

		AccountStatus.USERNAME_ALREADY_EXISTS,
		AccountStatus.EMAIL_ALREADY_EXITS,
		AccountStatus.PHONE_ALREADY_EXITS,

		AccountStatus.MISSING_USERNAME,
		AccountStatus.MISSING_PASSWORD,
		AccountStatus.MISSING_FIRST_NAME,
		AccountStatus.MISSING_LAST_NAME,
		AccountStatus.MISSING_EMAIL,
		AccountStatus.MISSING_ADDRESS,
		AccountStatus.MISSING_PHONE,
		AccountStatus.MISSING_BIRTHDAY,

		AccountStatus.WRONG_PASSWORD,
		AccountStatus.WRONG_EMAIL_FORMAT,

		AccountStatus.ERROR_UPDATE_PASSWORD,

		ProfileStatus.NOT_FOUND,

		CartStatus.NOT_FOUND,
		CartStatus.ERROR_ITEM,
		CartStatus.ERROR_DELETE_ITEM,
		CartStatus.ERROR_ADD_TO_DATABASE,
		CartStatus.ERROR_UPDATE_QUANTITY,

		ProductError.ERROR_ITEM,

		BillError.ERROR_CREATE,
		BillError.ERROR_ID,
		BillError.ERROR_DELETE,
		BillError.ERROR_ADD_ADDRESS,
		BillError.ERROR_DELETE_ADDRESS,
		BillError.ERROR_UPDATE_STATUS,

		WarehouseError.UPDATE_ERROR,
		WarehouseError.UPDATE_ERROR,
		WarehouseError.CREATE_ERROR,
	];

	const statusCode = isAppError ? err.statusCode : 500;
	const errorCode =
		isAppError && knownErrorCodes.includes(err.errorCode)
			? err.errorCode
			: "UNKNOWN_ERROR";
	const message =
		isAppError && knownErrorCodes.includes(err.errorCode)
			? err.message
			: "Something went wrong";

	// Log lỗi server để debug
	if (statusCode === 500 || errorCode === "UNKNOWN_ERROR") {
		console.error("[Server Error]", {
			message: err.message,
			stack: err.stack,
			url: req.originalUrl,
			method: req.method,
			ip: req.ip,
		});
	}

	res.status(statusCode).json({
		status: "ERROR",
		statusCode,
		errorCode,
		message,
	});
};

module.exports = errorHandler;
