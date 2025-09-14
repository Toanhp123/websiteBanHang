const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const PromotionRangeRuleCompatibility = sequelize.define(
	"PromotionRangeRuleCompatibility",
	{
		range_apply: {
			type: DataTypes.ENUM("invoice", "product"),
			primaryKey: true,
		},
		rule_type_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "promotion_range_rule_compatibility",
		timestamps: false,
	}
);

PromotionRangeRuleCompatibility.associate = (models) => {
	PromotionRangeRuleCompatibility.belongsTo(models.PromotionRuleType, {
		foreignKey: "rule_type_id",
	});
	PromotionRangeRuleCompatibility.belongsTo(models.Promotion, {
		foreignKey: "range_apply",
	});
};

module.exports = PromotionRangeRuleCompatibility;
