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

	// [POST] /account/cart
	async putItemToCart(req, res) {
		const { product_id, quantity } = req.body;
		const account_id = req.user.id;

		const cart = await AccountService.putItemToCart(
			product_id,
			quantity,
			account_id
		);

		res.json({ message: "Added to cart success", cart: cart });
	}

	// [GET] /account/cart
	async getCart(req, res) {
		const account_id = req.user.id;

		const cart = await AccountService.getCart(account_id);

		res.json(cart);
	}

	// [DELETE] /account/cart/:id
	async deleteItemInCart(req, res) {
		const { id } = req.params;

		await AccountService.deleteItemInCart(id);

		res.json({ message: "Delete item in cart success" });
	}

	// [DELETE] /account/cart
	async deleteCart(req, res) {
		const { id } = req.user;

		await AccountService.deleteCart(id);

		res.json({ message: "Delete item in cart success" });
	}

	// [PATCH] /account/cart/:id_product
	async changeQuantityItemCart(req, res) {
		const { id_product } = req.params;
		const { quantity } = req.body;
		await AccountService.changeQuantityItemCart(id_product, quantity);
		res.json({ message: "Change quantity in cart success" });
	}

	// [PUT] /account/password
	async changePassword(req, res) {
		const { id } = req.user;

		const { changePassword } = req.body;

		await AccountService.changePassword(changePassword, id);
		res.json({ message: "Change quantity in cart success" });
	}
}

module.exports = new AccountController();
