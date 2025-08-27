const billService = require("../services/bill.service");

class BillController {
	// [POST] /bill
	async createBill(req, res) {
		const { product, billDetail } = req.body;
		const { id } = req.user;

		await billService.createBill(id, product, billDetail);

		res.json({ message: "Order complete" });
	}
}

module.exports = new BillController();
