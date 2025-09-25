const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const InvoiceAudit = sequelize.define(
	"InvoiceAudit",
	{
		audit_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		invoice_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_status: {
			type: DataTypes.ENUM(
				"pending",
				"paid",
				"cancelled",
				"refund_requested",
				"refunded",
				"refund_rejected"
			),
			allowNull: false,
		},
		new_status: {
			type: DataTypes.ENUM(
				"pending",
				"paid",
				"cancelled",
				"refund_requested",
				"refunded",
				"refund_rejected"
			),
			allowNull: false,
		},
		changed_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		changed_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "invoice_audit",
		timestamps: false,
	}
);

InvoiceAudit.associate = (models) => {
	InvoiceAudit.belongsTo(models.Invoice, { foreignKey: "invoice_id" });
	InvoiceAudit.belongsTo(models.Employee, { foreignKey: "changed_by" });
};

module.exports = InvoiceAudit;
