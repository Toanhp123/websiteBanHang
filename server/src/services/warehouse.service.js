const { WarehouseError } = require("../constants/errorCode.constants");
const {
	sequelize,
	WarehouseReceipt,
	Employee,
	Warehouse,
	Supplier,
	WarehouseExport,
	InventoryAudit,
} = require("../models");
const { throwServerError } = require("../utils/errorThrowFunc");

class WarehouseService {
	async getReceiptBasicInfo(limit, offset) {
		const warehouseReceiptList = await WarehouseReceipt.findAll({
			include: [
				{
					model: Supplier,
					attributes: [],
				},
				{
					model: Employee,
					attributes: [],
				},
				{
					model: Warehouse,
					attributes: [],
				},
			],
			attributes: [
				"receipt_id",
				"receipt_date",
				[sequelize.col("Supplier.supplier_name"), "supplier_name"],
				[sequelize.col("Warehouse.warehouse_name"), "warehouse_name"],
				[
					sequelize.col("Employee.employee_first_name"),
					"employee_first_name",
				],
				[
					sequelize.col("Employee.employee_last_name"),
					"employee_last_name",
				],
			],
			limit,
			offset,
			order: [["receipt_date", "DESC"]],
		});

		const total = await WarehouseReceipt.count();
		const hasMore = offset + warehouseReceiptList.length < total;

		return { warehouseReceiptList, hasMore };
	}

	async getReceiptDetail(receipt_id) {
		const query = `
			SELECT 
				wri.product_id,
				wri.quantity,
				wri.unit_price,

				p.product_name,
				p.product_code
			FROM warehouse_receipt_item wri
			LEFT JOIN product p
				ON wri.product_id = p.product_id
			WHERE wri.receipt_id = :receipt_id
		`;

		const receiptDetail = await sequelize.query(query, {
			replacements: { receipt_id: receipt_id },
			type: sequelize.QueryTypes.SELECT,
		});

		return receiptDetail;
	}

	async getExportBasicInfo(limit, offset) {
		const warehouseExportList = await WarehouseExport.findAll({
			include: [
				{
					model: Employee,
					attributes: [],
				},
			],
			attributes: [
				"export_id",
				"invoice_id",
				"export_date",
				"reason",
				[
					sequelize.col("Employee.employee_first_name"),
					"employee_first_name",
				],
				[
					sequelize.col("Employee.employee_last_name"),
					"employee_last_name",
				],
			],
			limit,
			offset,
			order: [["export_date", "DESC"]],
		});

		const total = await WarehouseExport.count();
		const hasMore = offset + warehouseExportList.length < total;

		return { warehouseExportList, hasMore };
	}

	async getExportDetail(export_id) {
		const query = `
			SELECT 
				wei.product_id,
				wei.quantity,

				p.product_name,
				p.product_code,

				w.warehouse_id,
				w.warehouse_name,
				w.location
			FROM warehouse_export_item wei
			LEFT JOIN product p
				ON wei.product_id = p.product_id
			LEFT JOIN warehouse w
				ON wei.warehouse_id = w.warehouse_id
			WHERE wei.export_id = :export_id
		`;

		const exportDetail = await sequelize.query(query, {
			replacements: { export_id: export_id },
			type: sequelize.QueryTypes.SELECT,
		});

		return exportDetail;
	}

	async getInventoryAuditBasicInfo(limit, offset) {
		const inventoryAuditList = await InventoryAudit.findAll({
			include: [
				{
					model: Employee,
					attributes: [],
				},
				{
					model: Warehouse,
					attributes: [],
				},
			],
			attributes: [
				"audit_id",
				"audit_date",
				"old_quantity",
				"new_quantity",
				"change_amount",
				"action",
				[
					sequelize.col("Employee.employee_first_name"),
					"employee_first_name",
				],
				[
					sequelize.col("Employee.employee_last_name"),
					"employee_last_name",
				],
				[sequelize.col("Warehouse.warehouse_name"), "warehouse_name"],
			],
			limit,
			offset,
			order: [["audit_date", "DESC"]],
		});

		const total = await InventoryAudit.count();
		const hasMore = offset + inventoryAuditList.length < total;

		return { inventoryAuditList, hasMore };
	}

	async getAllWarehouse() {
		const warehouse = await Warehouse.findAll({
			include: [{ model: Employee, attributes: [] }],
			attributes: [
				"warehouse_id",
				"warehouse_name",
				"location",
				"priority",
				[
					sequelize.col("Employee.employee_first_name"),
					"employee_first_name",
				],
				[
					sequelize.col("Employee.employee_last_name"),
					"employee_last_name",
				],
			],
		});

		return warehouse;
	}

	async getWarehouseByID(warehouse_id) {
		const warehouse = await Warehouse.findOne({
			include: [{ model: Employee, attributes: [] }],
			attributes: [
				"warehouse_id",
				"warehouse_name",
				"location",
				"priority",
				"employee_id",
				[
					sequelize.col("Employee.employee_first_name"),
					"employee_first_name",
				],
				[
					sequelize.col("Employee.employee_last_name"),
					"employee_last_name",
				],
			],
			where: { warehouse_id },
		});

		return warehouse;
	}

	async updateWarehouse(
		warehouse_id,
		warehouse_name,
		location,
		priority,
		employee_id
	) {
		const transaction = await sequelize.transaction();

		try {
			await Warehouse.update(
				{ warehouse_name, location, priority: priority, employee_id },
				{ where: { warehouse_id }, transaction }
			);

			await transaction.commit();

			return { message: "Update success", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't update warehouse",
				WarehouseError.UPDATE_ERROR
			);
		}
	}
}

module.exports = new WarehouseService();
