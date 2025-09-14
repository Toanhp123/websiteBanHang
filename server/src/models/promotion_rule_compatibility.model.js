const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const PromotionRuleCompatibility = sequelize.define(
	"PromotionRuleCompatibility",
	{
		main_rule_type_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		compatible_rule_type_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "promotion_rule_compatibility",
		timestamps: false,
	}
);

PromotionRuleCompatibility.associate = (models) => {
	PromotionRuleCompatibility.belongsTo(models.PromotionRuleType, {
		foreignKey: "main_rule_type_id",
		as: "mainRuleType",
	});
	PromotionRuleCompatibility.belongsTo(models.PromotionRuleType, {
		foreignKey: "compatible_rule_type_id",
		as: "compatibleRuleType",
	});
};

module.exports = PromotionRuleCompatibility;
