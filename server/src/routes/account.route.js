const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const accountController = require("../controllers/account.controller");

const router = express.Router();

// [PATCH] /account/cart/:id_product
router.patch(
	"/cart/:id_product",
	checkAccessToken,
	catchAsync(accountController.changeQuantityItemCart)
);

// [PUT] /account/cart
router.put(
	"/cart",
	checkAccessToken,
	catchAsync(accountController.putItemToCart)
);

// [PUT] /account/password
router.put(
	"/password",
	checkAccessToken,
	catchAsync(accountController.changePassword)
);

// [GET] /account/cart
router.get("/cart", checkAccessToken, catchAsync(accountController.getCart));

// [GET] /account
router.get(
	"/",
	checkAccessToken,
	catchAsync(accountController.getAccountByCondition)
);

// [DELETE] /account/cart/:id
router.delete(
	"/cart/:id",
	checkAccessToken,
	catchAsync(accountController.deleteItemInCart)
);

// [DELETE] /account/cart/:id
router.delete(
	"/cart",
	checkAccessToken,
	catchAsync(accountController.deleteCart)
);

// [GET] /account/employee
router.get(
	"/employee",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(accountController.getAllEmployee)
);

// [GET] /account/position
router.get(
	"/employee/position",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.getAllPositionEmployee)
);

// [GET] /account/employee/detailAndAccount/:employee_id
router.get(
	"/employee/detailAndAccount/:employee_id",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.getDetailEmployeeAndAccount)
);

// [GET] /account/employee/:employee_id
router.get(
	"/employee/:employee_id",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.getDetailEmployee)
);

// [PATCH] /account/employee/:employee_id
router.patch(
	"/employee/:employee_id",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.updateEmployee)
);

// [DELETE] /account/employee/:employee_id
router.delete(
	"/employee/:employee_id",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.deleteEmployee)
);

// [POST] /account/employee/
router.post(
	"/employee",
	checkAccessToken,
	checkRole(["Admin"]),
	catchAsync(accountController.addEmployee)
);

// [GET] /account/:username
router.get(
	"/:username",
	checkAccessToken,
	catchAsync(accountController.getAccountByUsername)
);

// [POST] /account/reset
router.post("/reset", catchAsync(accountController.resetPassword));

module.exports = router;
