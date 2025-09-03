const { Invoice, Product, sequelize } = require("../models");

class DashboardService {
	async getOverview() {
		const totalProducts = await Product.count();
		const orderStats = await Invoice.findAll({
			attributes: [
				"status",
				[sequelize.fn("COUNT", sequelize.col("invoice_id")), "count"],
			],
			group: ["status"],
		});

		console.log(orderStats.map((r) => r.toJSON()));

		const revenue = await Invoice.sum("total_final_amount", {
			where: { status: "paid" },
		});
	}
}

module.exports = new DashboardService();
