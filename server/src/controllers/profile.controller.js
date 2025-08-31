const profileService = require("../services/profile.service");

class ProfileController {
	// [GET] /profile/:username
	async getProfile(req, res) {
		const { id } = req.params;

		const profile = await profileService.getProfile(id);

		res.status(200).json(profile);
	}
}

module.exports = new ProfileController();
