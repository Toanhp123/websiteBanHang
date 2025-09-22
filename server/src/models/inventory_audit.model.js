const { DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../configs/database.config");

const InventoryAudit = sequelize.define(
	"InventoryAudit",
	{
		audit_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		warehouse_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		new_quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		change_amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		audit_date: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NEW,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "inventory_audit",
		timestamps: false,
	}
);

InventoryAudit.associate = (models) => {
	InventoryAudit.belongsTo(models.Product, {
		foreignKey: "product_id",
	});
	InventoryAudit.belongsTo(models.Employee, {
		foreignKey: "employee_id",
	});
	InventoryAudit.belongsTo(models.Warehouse, {
		foreignKey: "warehouse_id",
	});
};

module.exports = InventoryAudit;
