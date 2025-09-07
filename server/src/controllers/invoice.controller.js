const InvoiceService = require("../services/invoice.service");

class InvoiceController {
	// [POST] /invoice
	async createInvoice(req, res) {
		const { cart, billDetail, promotion_id, discount, final_total } =
			req.body;
		const { id } = req.user;

		const invoice = await InvoiceService.createInvoice(
			id,
			cart,
			billDetail,
			promotion_id,
			discount,
			final_total
		);

		res.json(invoice);
	}

	// [GET] /invoice/detail/:invoice_id
	async getInvoiceDetail(req, res) {
		const { invoice_id } = req.params;

		const invoiceDetail = await InvoiceService.getInvoiceDetail(invoice_id);

		res.json(invoiceDetail);
	}

	// [GET] /invoice/detail
	async getAllInvoiceDetail(req, res) {
		const { id } = req.user;

		const allInvoiceDetail = await InvoiceService.getAllInvoiceDetail(id);

		res.json(allInvoiceDetail);
	}

	// [GET] /invoice/:invoice_id
	async getInvoice(req, res) {
		const { invoice_id } = req.params;

		const invoice = await InvoiceService.getInvoice(invoice_id);

		res.json(invoice);
	}

	// [DELETE] /invoice/:invoice_id
	async deleteInvoice(req, res) {
		const { invoice_id } = req.params;

		await InvoiceService.deleteInvoice(invoice_id);

		res.json({ message: "delete ok" });
	}

	// [GET] /invoice/address
	async getAddressShipping(req, res) {
		const { id } = req.user;

		const addressShipping = await InvoiceService.getAddressShipping(id);

		res.json(addressShipping);
	}

	// [POST] /invoice/address
	async createInvoiceAddress(req, res) {
		const { id } = req.user;
		const { invoiceAddress } = req.body;

		const invoiceAdd = await InvoiceService.createInvoiceAddress(
			id,
			invoiceAddress
		);

		res.json(invoiceAdd);
	}

	// [POST] /invoice/address
	async deleteInvoiceAddress(req, res) {
		const { invoice_address_id } = req.params;

		await InvoiceService.deleteInvoiceAddress(invoice_address_id);

		res.json({ message: "ok" });
	}

	// [GET] /invoice/ordersList
	async getOrdersList(req, res) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;

		const ordersList = await InvoiceService.getOrdersList(limit, offset);

		res.json(ordersList);
	}

	// [PATCH] /invoice/orders/:invoice_id
	async updateOrderStatus(req, res) {
		const { status } = req.body;
		const { invoice_id } = req.params;
		const { id } = req.user;

		await InvoiceService.updateOrderStatus(status, invoice_id, id);

		res.json({ message: "ok" });
	}
}

module.exports = new InvoiceController();
