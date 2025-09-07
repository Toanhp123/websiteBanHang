const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const Warehouse = sequelize.define(
	"Warehouse",
	{
		warehouse_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		warehouse_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		priority: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: "warehouse",
		timestamps: false,
	}
);

Warehouse.associate = (models) => {
	Warehouse.hasMany(models.Inventory, {
		foreignKey: "warehouse_id",
	});
	Warehouse.hasMany(models.StockCheck, {
		foreignKey: "warehouse_id",
	});
	Warehouse.hasMany(models.DamagedGood, {
		foreignKey: "warehouse_id",
	});
	Warehouse.hasMany(models.InventoryAudit, {
		foreignKey: "warehouse_id",
	});
	Warehouse.hasMany(models.WarehouseReceipt, {
		foreignKey: "warehouse_id",
	});

	Warehouse.belongsTo(models.Employee, {
		foreignKey: "employee_id",
	});
};

module.exports = Warehouse;
