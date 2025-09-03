const dashboardService = require("../services/dashboard.service");

class DashboardController {
	// [GET] /dashboard/overview
	async getOverview(req, res) {
		const overview = await dashboardService.getOverview();

		return res.json(overview);
	}
}

module.exports = new DashboardController();
