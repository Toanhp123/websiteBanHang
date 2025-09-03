const { Invoice, Product, sequelize, Account } = require("../models");

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

	async getSaleStatistics() {
		const queryRevenueByMonth = `
			SELECT 
    			YEAR(invoice_date) AS year,
    			MONTH(invoice_date) AS month,
    			SUM(total_final_amount) AS revenue
			FROM invoice
			WHERE status = 'paid'
			GROUP BY YEAR(invoice_date), MONTH(invoice_date)
			ORDER BY year, month;`;

		const queryProductSaleData = `
			SELECT 
    			p.product_id,
    			p.product_name,
    			SUM(id.quantity) AS total_sold
			FROM invoice_detail id
				INNER JOIN invoice i 
					ON id.invoice_id = i.invoice_id
				INNER JOIN product p 
					ON id.product_id = p.product_id
			WHERE i.status = 'paid'
			GROUP BY p.product_id, p.product_name
			ORDER BY total_sold DESC
			LIMIT 10;`;

		const queryAccountCreatedData = `
			SELECT 
    			MONTH(create_at) AS month,
    			COUNT(account_id) AS total_accounts
			FROM account
			GROUP BY month
			ORDER BY month;`;

		const revenueByMonth = await sequelize.query(queryRevenueByMonth, {
			type: sequelize.QueryTypes.SELECT,
		});
		const productSaleData = await sequelize.query(queryProductSaleData, {
			type: sequelize.QueryTypes.SELECT,
		});
		const orderStatusData = await Invoice.findAll({
			attributes: [
				"status",
				[sequelize.fn("COUNT", sequelize.col("invoice_id")), "count"],
			],
			group: ["status"],
		});
		const accountCreatedData = await sequelize.query(
			queryAccountCreatedData,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);

		return {
			revenueByMonth,
			productSaleData,
			orderStatusData,
			accountCreatedData,
		};
	}
}

module.exports = new DashboardService();
