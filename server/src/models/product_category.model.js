const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const ProductCategory = sequelize.define(
	"ProductCategory",
	{
		product_category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		product_category_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "product_category",
		timestamps: false,
	}
);

ProductCategory.associate = (models) => {
	ProductCategory.hasMany(models.Product, {
		foreignKey: "product_category_id",
	});
};

module.exports = ProductCategory;
