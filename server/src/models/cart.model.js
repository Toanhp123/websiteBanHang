const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const Cart = sequelize.define(
	"Cart",
	{
		cart_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		create_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "cart",
		timestamps: false,
	}
);

Cart.associate = (models) => {
	Cart.belongsTo(models.Customer, { foreignKey: "customer_id" });

	Cart.hasMany(models.CartProduct, { foreignKey: "cart_id" });
};

module.exports = Cart;
