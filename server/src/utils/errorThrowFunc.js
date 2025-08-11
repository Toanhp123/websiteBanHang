const AppError = require("./errorCustom.util");

const throwBadRequest = (message, errorCode = "") => {
	throw new AppError(message, {
		statusCode: 400,
		errorCode,
	});
};

const throwUnauthorized = (message, errorCode = "") => {
	throw new AppError(message, {
		statusCode: 401,
		errorCode,
	});
};

const throwForbiddenError = (message, errorCode) => {
	throw new AppError(message, {
		statusCode: 403,
		errorCode,
	});
};

const throwNotFoundError = (message, errorCode) => {
	throw new AppError(message, {
		statusCode: 404,
		errorCode,
	});
};

const throwConflictError = (message, errorCode) => {
	throw new AppError(message, {
		statusCode: 409,
		errorCode,
	});
};

const throwServerError = (message, errorCode) => {
	throw new AppError(message, {
		statusCode: 500,
		errorCode,
	});
};

module.exports = {
	throwBadRequest,
	throwUnauthorized,
	throwForbiddenError,
	throwNotFoundError,
	throwConflictError,
	throwServerError,
};
