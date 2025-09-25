const { DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../configs/database.config");

const WarehouseReceipt = sequelize.define(
	"WarehouseReceipt",
	{
		receipt_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		supplier_id: {
			type: DataTypes.STRING(10),
			allowNull: true,
		},
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		receipt_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		warehouse_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		source_type: {
			type: DataTypes.ENUM("SUPPLIER", "CUSTOMER"),
			defaultValue: "SUPPLIER",
		},
		invoice_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "warehouse_receipt",
		timestamps: false,
	}
);

WarehouseReceipt.associate = (models) => {
	WarehouseReceipt.hasMany(models.WarehouseReceiptItem, {
		foreignKey: "receipt_id",
	});

	WarehouseReceipt.belongsTo(models.Supplier, {
		foreignKey: "supplier_id",
	});
	WarehouseReceipt.belongsTo(models.Employee, {
		foreignKey: "employee_id",
	});
	WarehouseReceipt.belongsTo(models.Warehouse, {
		foreignKey: "warehouse_id",
	});
	WarehouseReceipt.belongsTo(models.Customer, {
		foreignKey: "customer_id",
	});
	WarehouseReceipt.belongsTo(models.Invoice, {
		foreignKey: "invoice_id",
	});
};

module.exports = WarehouseReceipt;
