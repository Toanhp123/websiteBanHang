const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const BlogCategory = sequelize.define(
	"BlogCategory",
	{
		category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		slug: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "blog_categories",
		timestamps: false,
	}
);

BlogCategory.associate = (models) => {
	BlogCategory.hasMany(models.Blog, {
		foreignKey: "category_id",
	});
};

module.exports = BlogCategory;
