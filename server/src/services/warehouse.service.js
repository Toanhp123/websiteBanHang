const {
	sequelize,
	WarehouseReceipt,
	Employee,
	Warehouse,
	Supplier,
} = require("../models");

class WarehouseService {
	async getReceiptBasicInfo(limit, offset) {
		const query = `
            SELECT 
                wr.receipt_id,
                s.supplier_name,
                w.warehouse_name,
                e.employee_first_name,
                e.employee_last_name,
                wr.receipt_date
            FROM warehouse_receipt wr
            LEFT JOIN supplier s
                ON wr.supplier_id = s.supplier_id
            LEFT JOIN warehouse w
                ON wr.warehouse_id = w.warehouse_id
            LEFT JOIN employee e
                ON wr.employee_id = e.employee_id
        `;

		// const info = await sequelize.query(query, {
		// 	type: sequelize.QueryTypes.SELECT,
		// });

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
}

module.exports = new WarehouseService();
