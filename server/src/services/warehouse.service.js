const {
	WarehouseError,
	ProductError,
} = require("../constants/errorCode.constants");
const {
	sequelize,
	WarehouseReceipt,
	Employee,
	Warehouse,
	Supplier,
	WarehouseExport,
	InventoryAudit,
	Inventory,
	Account,
	Product,
	ProductStatus,
	WarehouseReceiptItem,
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
				{
					model: Product,
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
				[sequelize.col("Product.product_name"), "product_name"],
			],
			limit,
			offset,
			order: [["audit_id", "DESC"]],
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
			where: { is_active: true },
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

	async updateWarehouse(warehouse_id, changes) {
		const transaction = await sequelize.transaction();

		try {
			await Warehouse.update(
				{ ...changes },
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

	async deleteWarehouse(warehouse_id, account_id) {
		const transaction = await sequelize.transaction();

		try {
			await Warehouse.update(
				{ is_active: false },
				{ where: { warehouse_id }, transaction }
			);

			await Inventory.update(
				{ is_active: false },
				{ where: { warehouse_id }, transaction }
			);

			const inventories = await Inventory.findAll({
				where: { warehouse_id },
				transaction,
			});

			const account = await Account.findOne({ where: { account_id } });

			const employee_id = account.employee_id;

			const auditLogs = inventories.map((inv) => {
				return {
					warehouse_id: warehouse_id,
					product_id: inv.product_id,
					employee_id: employee_id,
					old_quantity: inv.quantity,
					new_quantity: inv.quantity,
					change_amount: 0,
					action: "deactivate",
				};
			});

			await InventoryAudit.bulkCreate(auditLogs, { transaction });

			await transaction.commit();

			return { message: "Delete success", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't delete warehouse",
				WarehouseError.DELETE_ERROR
			);
		}
	}

	async addWarehouse(warehouseName, location, priority, employeeID) {
		const transaction = await sequelize.transaction();

		try {
			const warehouse = await Warehouse.create(
				{
					warehouse_name: warehouseName,
					location,
					priority,
					employee_id: employeeID,
				},
				{ transaction }
			);

			const products = await Product.findAll();

			const inventories = products.map((p) => ({
				product_id: p.product_id,
				warehouse_id: warehouse.warehouse_id,
				quantity: 0,
				last_checked_at: new Date(),
			}));

			await Inventory.bulkCreate(inventories, { transaction });

			transaction.commit();

			return { message: "add warehouse success", success: true };
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't add warehouse",
				WarehouseError.CREATE_ERROR
			);
		}
	}

	async getInventory(warehouse_id, supplier_id) {
		const where = { warehouse_id };

		if (supplier_id) {
			where["$Product.Supplier.supplier_id$"] = supplier_id;
		}

		return await Inventory.findAll({
			include: [
				{
					model: Product,
					attributes: [],
					include: [
						{ model: ProductStatus, attributes: [] },
						{
							model: Supplier,
							attributes: [],
						},
					],
				},
			],
			attributes: [
				"quantity",
				"last_checked_at",
				[sequelize.col("Product.product_id"), "product_id"],
				[sequelize.col("Product.product_name"), "product_name"],
				[sequelize.col("Product.product_code"), "product_code"],
				[
					sequelize.col("Product.ProductStatus.product_status_name"),
					"product_status_name",
				],
				[
					sequelize.col("Product.Supplier.supplier_name"),
					"supplier_name",
				],
				[sequelize.col("Product.Supplier.supplier_id"), "supplier_id"],
			],
			where,
		});
	}

	async createWarehouseImport(account_id, data) {
		const transaction = await sequelize.transaction();

		try {
			const account = await Account.findOne({ where: { account_id } });
			const employee_id = account.employee_id;

			const warehouseImport = await WarehouseReceipt.create(
				{
					supplier_id: data.supplier_id,
					warehouse_id: data.warehouse_id,
					employee_id,
				},
				{ transaction }
			);

			const receipt_id = warehouseImport.receipt_id;

			for (const product of data.products) {
				const product_price = await Product.findOne({
					attributes: ["price"],
					where: { product_id: product.product_id },
					raw: true,
				});

				await WarehouseReceiptItem.create(
					{
						receipt_id,
						quantity: product.quantity,
						product_id: product.product_id,
						unit_price: product_price.price,
					},
					{ transaction }
				);

				const inventory = await Inventory.findOne({
					where: {
						warehouse_id: data.warehouse_id,
						product_id: product.product_id,
					},
				});

				const oldQty = inventory.quantity;
				const newQty = oldQty + product.quantity;

				await inventory.update({ quantity: newQty }, { transaction });

				await InventoryAudit.create(
					{
						warehouse_id: data.warehouse_id,
						product_id: product.product_id,
						employee_id,
						old_quantity: oldQty,
						new_quantity: newQty,
						change_amount: product.quantity,
						action: "IMPORT",
					},
					{ transaction }
				);
			}

			transaction.commit();

			return {
				message: "create warehouse import success",
				success: true,
			};
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't create warehouse import",
				WarehouseError.CREATE_ERROR
			);
		}
	}
}

module.exports = new WarehouseService();
