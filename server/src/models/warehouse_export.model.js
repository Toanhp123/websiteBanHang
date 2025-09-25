const { DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../configs/database.config");

const WarehouseExport = sequelize.define(
	"WarehouseExport",
	{
		export_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		export_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		invoice_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "warehouse_export",
		timestamps: false,
	}
);

WarehouseExport.associate = (models) => {
	WarehouseExport.hasMany(models.WarehouseExportItem, {
		foreignKey: "export_id",
	});

	WarehouseExport.belongsTo(models.Employee, {
		foreignKey: "employee_id",
	});
	WarehouseExport.belongsTo(models.Invoice, {
		foreignKey: "invoice_id",
	});
};

module.exports = WarehouseExport;
