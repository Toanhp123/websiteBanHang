const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const PromotionCategory = sequelize.define(
	"PromotionCategory",
	{
		promotion_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		product_category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "promotion_category",
		timestamps: false,
	}
);

PromotionCategory.associate = (models) => {
	PromotionCategory.belongsTo(models.ProductCategory, {
		foreignKey: "product_category_id",
	});
	PromotionCategory.hasMany(models.Promotion, {
		foreignKey: "promotion_id",
	});
};

module.exports = PromotionCategory;
