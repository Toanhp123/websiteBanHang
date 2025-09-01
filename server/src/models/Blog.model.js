const { DataTypes } = require("sequelize");

const sequelize = require("../configs/database.config");

const Blog = sequelize.define(
	"Blog",
	{
		post_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		slug: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		excerpt: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		thumbnail: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		account_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		status: {
			type: DataTypes.ENUM("draft", "published", "archived"),
			defaultValue: "draft",
		},
	},
	{
		tableName: "blog",
		timestamps: false,
	}
);

Blog.associate = (models) => {
	Blog.belongsTo(models.BlogCategory, {
		foreignKey: "category_id",
	});
	Blog.belongsTo(models.Account, {
		foreignKey: "account_id",
	});
};

module.exports = Blog;
