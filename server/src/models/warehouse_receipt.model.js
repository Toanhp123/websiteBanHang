const { DataTypes } = require("sequelize");

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
			allowNull: false,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		receipt_date: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
		},
		warehouse_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
};

module.exports = WarehouseReceipt;
