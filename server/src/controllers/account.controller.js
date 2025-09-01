const { AccountFilter } = require("../utils/search");

const accountService = require("../services/account.service");

class AccountController {
	// [GET] /account
	async getAccountByCondition(req, res) {
		const accounts = await accountService.getAccountByCondition(
			AccountFilter(req.query)
		);

		res.json(accounts);
	}

	// [GET] /account/:username
	async getAccountByUsername(req, res) {
		const { username } = req.params;

		const account = await accountService.getAccountByUsername(username);

		res.json(account);
	}

	// [POST] /account/cart
	async putItemToCart(req, res) {
		const { product_id, quantity } = req.body;
		const account_id = req.user.id;

		const cart = await accountService.putItemToCart(
			product_id,
			quantity,
			account_id
		);

		res.json({ message: "Added to cart success", cart: cart });
	}

	// [GET] /account/cart
	async getCart(req, res) {
		const account_id = req.user.id;

		const cart = await accountService.getCart(account_id);

		res.json(cart);
	}

	// [DELETE] /account/cart/:id
	async deleteItemInCart(req, res) {
		const { id } = req.params;

		await accountService.deleteItemInCart(id);

		res.json({ message: "Delete item in cart success" });
	}

	// [DELETE] /account/cart
	async deleteCart(req, res) {
		const { id } = req.user;

		await accountService.deleteCart(id);

		res.json({ message: "Delete item in cart success" });
	}

	// [PATCH] /account/cart/:id_product
	async changeQuantityItemCart(req, res) {
		const { id_product } = req.params;
		const { quantity } = req.body;

		await accountService.changeQuantityItemCart(id_product, quantity);

		res.json({ message: "Change quantity in cart success" });
	}

	// [PUT] /account/password
	async changePassword(req, res) {
		const { id } = req.user;

		const { changePassword } = req.body;

		await accountService.changePassword(changePassword, id);
		res.json({ message: "Change quantity in cart success" });
	}

	// [POST] /account/reset
	async resetPassword(req, res) {
		const { pass, email } = req.body;

		await accountService.resetPassword(pass, email);

		return res.json({ message: "done" });
	}
}

module.exports = new AccountController();
