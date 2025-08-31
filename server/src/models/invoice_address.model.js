const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const InvoiceAddress = sequelize.define(
	"InvoiceAddress",
	{
		invoice_address_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zip_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		is_delete: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: "invoice_address",
		timestamps: false,
	}
);

InvoiceAddress.associate = (models) => {
	InvoiceAddress.hasMany(models.Invoice, {
		foreignKey: "invoice_id",
	});
};

module.exports = InvoiceAddress;
