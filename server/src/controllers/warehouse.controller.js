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

	// [GET] /warehouse/export
	async getExportBasicInfo(req, res) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;

		const warehouseExportList = await warehouseService.getExportBasicInfo(
			limit,
			offset
		);

		res.json(warehouseExportList);
	}

	// [GET] /warehouse/export/:export_id
	async getExportDetail(req, res) {
		const { export_id } = req.params;

		console.log(export_id);

		const warehouseExportDetail = await warehouseService.getExportDetail(
			export_id
		);

		res.json(warehouseExportDetail);
	}

	// [GET] /warehouse/inventoryAudit
	async getInventoryAuditBasicInfo(req, res) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;

		const inventoryAuditList =
			await warehouseService.getInventoryAuditBasicInfo(limit, offset);

		res.json(inventoryAuditList);
	}

	// [GET] /warehouse
	async getAllWarehouse(req, res) {
		const warehouse = await warehouseService.getAllWarehouse();

		res.json(warehouse);
	}

	// [GET] /warehouse/:warehouse_id
	async getWarehouseByID(req, res) {
		const { warehouse_id } = req.params;

		const warehouse = await warehouseService.getWarehouseByID(warehouse_id);

		res.json(warehouse);
	}

	// [PUT] /warehouse/:warehouse_id
	async updateWarehouse(req, res) {
		const { warehouse_id } = req.params;
		const { changes } = req.body;

		console.log(changes);

		const message = await warehouseService.updateWarehouse(
			warehouse_id,
			changes
		);

		res.json(message);
	}

	// [DELETE] /warehouse/:warehouse_id
	async deleteWarehouse(req, res) {
		const { warehouse_id } = req.params;
		const { id } = req.user;

		const message = await warehouseService.deleteWarehouse(
			warehouse_id,
			id
		);

		res.json(message);
	}

	// [POST] /warehouse/addWarehouse
	async addWarehouse(req, res) {
		const { warehouseName, location, priority, employeeID } =
			req.body.WarehouseInfo;

		const message = await warehouseService.addWarehouse(
			warehouseName,
			location,
			priority,
			employeeID
		);

		res.json(message);
	}

	// [GET] warehouse/inventory/:warehouse_id
	async getInventory(req, res) {
		const { warehouse_id } = req.params;
		const { supplier_id } = req.query;

		const inventory = await warehouseService.getInventory(
			warehouse_id,
			supplier_id
		);

		res.json(inventory);
	}

	// [POST] warehouse/import
	async createWarehouseImport(req, res) {
		const { data } = req.body;
		const { id } = req.user;

		const message = await warehouseService.createWarehouseImport(id, data);

		res.json(message);
	}
}

module.exports = new WarehouseController();
