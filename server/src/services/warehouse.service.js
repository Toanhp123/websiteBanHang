const {
	sequelize,
	WarehouseReceipt,
	Employee,
	Warehouse,
	Supplier,
} = require("../models");

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
}

module.exports = new WarehouseService();
