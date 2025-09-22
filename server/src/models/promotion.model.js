const { DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../configs/database.config");

const Promotion = sequelize.define(
	"Promotion",
	{
		promotion_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		promotion_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		valid_from: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		valid_to: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		distribution_type: {
			type: DataTypes.ENUM("share", "exclusive"),
			allowNull: false,
			defaultValue: "share",
		},
		range_apply: {
			type: DataTypes.ENUM("invoice", "product"),
			allowNull: false,
		},
		promotion_status: {
			type: DataTypes.ENUM("active", "expired", "deleted"),
			defaultValue: "active",
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		tableName: "promotion",
		timestamps: false,
	}
);

Promotion.associate = (models) => {
	Promotion.hasMany(models.Invoice, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.InvoiceDetail, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.PromotionRule, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.PromotionEffect, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.PromotionProduct, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.CustomerPromotion, {
		foreignKey: "promotion_id",
	});
	Promotion.hasMany(models.PromotionCategory, {
		foreignKey: "promotion_id",
		as: "PromotionCategory",
	});
	Promotion.hasMany(models.PromotionRangeRuleCompatibility, {
		foreignKey: "range_apply",
	});
};

module.exports = Promotion;
