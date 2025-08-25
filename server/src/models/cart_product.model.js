const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const CartProduct = sequelize.define(
	"CartProduct",
	{
		cart_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
	},
	{
		tableName: "cart_product",
		timestamps: false,
	}
);

CartProduct.associate = (models) => {
	CartProduct.belongsTo(models.Cart, { foreignKey: "cart_id" });
	CartProduct.belongsTo(models.Product, { foreignKey: "product_id" });
};

module.exports = CartProduct;
