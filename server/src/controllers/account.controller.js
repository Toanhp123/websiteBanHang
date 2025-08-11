const { AccountFilter } = require("../utils/search");

const AccountService = require("../services/account.service");

class AccountController {
	// [GET] /account
	async getAccountByCondition(req, res) {
		const accounts = await AccountService.getAccountByCondition(
			AccountFilter(req.query)
		);

		res.json(accounts);
	}

	// [GET] /account/:username
	async getAccountByUsername(req, res) {
		const { username } = req.params;

		const account = await AccountService.getAccountByUsername(username);

		res.json(account);
	}
}

module.exports = new AccountController();
