const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const RuleEffectCompatibility = sequelize.define(
	"RuleEffectCompatibility",
	{
		rule_type_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		effect_type_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "rule_effect_compatibility",
		timestamps: false,
	}
);

RuleEffectCompatibility.associate = (models) => {
	RuleEffectCompatibility.belongsTo(models.PromotionRuleType, {
		foreignKey: "rule_type_id",
	});
	RuleEffectCompatibility.belongsTo(models.PromotionEffectType, {
		foreignKey: "effect_type_id",
	});
};

module.exports = RuleEffectCompatibility;
