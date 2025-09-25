const {
	checkAccessToken,
	checkRole,
} = require("../middlewares/auth.middleware");

const express = require("express");
const catchAsync = require("../utils/catchAsync");
const invoiceController = require("../controllers/invoice.controller");

const router = express.Router();

// [GET] /invoice/address
router.get(
	"/address",
	checkAccessToken,
	catchAsync(invoiceController.getAddressShipping)
);

// [GET] /invoice/detail
router.get(
	"/detail",
	checkAccessToken,
	catchAsync(invoiceController.getAllInvoiceDetail)
);

// [GET] /invoice/detail/:invoice_id
router.get(
	"/detail/:invoice_id",
	checkAccessToken,
	catchAsync(invoiceController.getInvoiceDetail)
);

// [GET] /invoice/ordersList
router.get(
	"/ordersList",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(invoiceController.getOrdersList)
);

// [GET] /invoice
router.get(
	"/:invoice_id",
	checkAccessToken,
	catchAsync(invoiceController.getInvoice)
);

// [POST] /invoice/address
router.post(
	"/address",
	checkAccessToken,
	catchAsync(invoiceController.createInvoiceAddress)
);

// [POST] /invoice
router.post("/", checkAccessToken, catchAsync(invoiceController.createInvoice));

// [PATCH] /invoice/order/:invoice_id
router.patch(
	"/orders/:invoice_id",
	checkAccessToken,
	checkRole(["Admin", "Employee"]),
	catchAsync(invoiceController.updateOrderStatus)
);

// [PATCH] /invoice/:invoice_id
router.patch(
	"/:invoice_id",
	checkAccessToken,
	catchAsync(invoiceController.refundedInvoice)
);

// [DELETE] /invoice/:invoice_id
router.delete(
	"/:invoice_id",
	checkAccessToken,
	catchAsync(invoiceController.deleteInvoice)
);

// [DELETE] /invoice/address/:invoice_address_id
router.delete(
	"/address/:invoice_address_id",
	checkAccessToken,
	catchAsync(invoiceController.deleteInvoiceAddress)
);

module.exports = router;
