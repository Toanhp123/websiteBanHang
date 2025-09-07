const warehouseService = require("../services/warehouse.service");

class WarehouseController {
	// [GET] /warehouse/receipt
	async getReceiptBasicInfo(req, res) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;

		const warehouseReceiptList = await warehouseService.getReceiptBasicInfo(
			limit,
			offset
		);

		res.json(warehouseReceiptList);
	}

	// [GET] /warehouse/receipt/:receipt_id
	async getReceiptDetail(req, res) {
		const { receipt_id } = req.params;

		const warehouseReceiptDetail = await warehouseService.getReceiptDetail(
			receipt_id
		);

		res.json(warehouseReceiptDetail);
	}
}

module.exports = new WarehouseController();
