const profileService = require("../services/profile.service");

class ProfileController {
	// [GET] /profile/:username
	async getProfile(req, res) {
		const { id } = req.user;

		const profile = await profileService.getProfile(id);

		res.json(profile);
	}

	// [PATCH] /profile/update
	async updateProfile(req, res) {
		const { changes } = req.body;
		const { id } = req.user;

		const message = await profileService.updateProfile(changes, id);

		res.json(message);
	}
}

module.exports = new ProfileController();
