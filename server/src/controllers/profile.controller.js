const ProfileService = require("../services/profile.service");

class profileController {
	// [GET] /profile/:username
	async getProfile(req, res) {
		const { id } = req.params;

		const profile = await ProfileService.getProfile(id);

		res.status(200).json(profile);
	}
}

module.exports = new profileController();
