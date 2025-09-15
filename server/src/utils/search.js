const { Op } = require("sequelize");

/**
 * Hàm tìm kiếm account theo điều kiện nhất định
 * @param {Object} query - Đối tượng chứa các điều kiện tìm kiếm
 */
const AccountFilter = (query) => {
	const filter = {};

	if (query.status) filter.account_status = query.status;
	if (query.username) {
		filter.username = { [Op.like]: `%${query.username}%` };
	}

	return filter;
};

const ProductFilter = (query) => {
	const where = {};
	const having = {};
	const order = [];

	if (query.search) {
		where[Op.or] = [
			{ product_name: { [Op.like]: `%${query.search}%` } },
			{ product_description: { [Op.like]: `%${query.search}%` } },
		];
	}

	if (query.category) having.category = query.category;
	if (query.productType) having.type = query.productType;
	if (query.availability === "Hết hàng") {
		having.totalStock = 0;
	} else if (query.availability === "Còn hàng") {
		having.totalStock = { [Op.gt]: 0 };
	} else {
		having.totalStock = { [Op.gte]: 0 };
	}

	if (query.sortBy) {
		switch (query.sortBy) {
			case "Mới nhất":
				order.push(["product_date_add", "DESC"]);
				break;
			case "Cũ nhất":
				order.push(["product_date_add", "ASC"]);
				break;
			case "Giá thấp đến thấp":
				order.push(["price", "ASC"]);
				break;
			case "Giá cao đến thấp":
				order.push(["price", "DESC"]);
				break;
			default:
				order.push(["product_date_add", "DESC"]); // mặc định latest
		}
	} else {
		order.push(["product_date_add", "DESC"]); // default
	}

	return { where, having, order };
};

module.exports = {
	AccountFilter,
	ProductFilter,
};
