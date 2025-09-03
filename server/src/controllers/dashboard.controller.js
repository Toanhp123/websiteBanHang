const dashboardService = require("../services/dashboard.service");

class DashboardController {
	// [GET] /dashboard/overview
	async getOverview(req, res) {
		const overview = await dashboardService.getOverview();

		return res.json(overview);
	}

	// [GET] /dashboard/saleStatistics
	async getSaleStatistics(req, res) {
		const saleStatistics = await dashboardService.getSaleStatistics();

		return res.json(saleStatistics);
	}
}

module.exports = new DashboardController();
