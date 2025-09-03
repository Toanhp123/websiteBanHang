const { Invoice, Product, sequelize } = require("../models");

class DashboardService {
	async getOverview() {
		const totalProducts = await Product.count();
		let orderStats = await Invoice.findAll({
			attributes: [
				"status",
				[sequelize.fn("COUNT", sequelize.col("invoice_id")), "count"],
			],
			group: ["status"],
		});

		orderStats = orderStats.map((r) => r.toJSON());

		const revenue = await Invoice.sum("total_final_amount", {
			where: { status: "paid" },
		});

		return { totalProducts, orderStats, revenue };
	}
}

module.exports = new DashboardService();
