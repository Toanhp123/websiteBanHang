const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const CustomerPromotion = sequelize.define(
	"CustomerPromotion",
	{
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		promotion_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		all_customers: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: "customer_promotion",
		timestamps: false,
	}
);

CustomerPromotion.associate = (models) => {
	CustomerPromotion.belongsTo(models.Customer, {
		foreignKey: "customer_id",
		constraints: false,
	});
	CustomerPromotion.belongsTo(models.Promotion, {
		foreignKey: "promotion_id",
	});
};

module.exports = CustomerPromotion;
