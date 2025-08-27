const { BillError } = require("../configs/constants.config");
const { Account, sequelize, InvoiceAddress, Invoice } = require("../models");
const { throwServerError } = require("../utils/errorThrowFunc");

class BillService {
	// TODO: cần thêm khuyến mãi
	async createBill(account_id, product, billDetail) {
		const transaction = await sequelize.transaction();
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.customer_id;
		const total_amount = product.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		const total_final_amount = total_amount;

		try {
			const [item] = await InvoiceAddress.findOrCreate({
				where: {
					first_name: billDetail.firstName,
					last_name: billDetail.lastName,
					email: billDetail.email,
					street_address: billDetail.streetAddress,
					city: billDetail.city,
					country: billDetail.country,
					zip_code: billDetail.zipCode,
					phone: billDetail.phone,
				},
				transaction,
			});

			const invoice_address_id = item.invoice_address_id;

			await Invoice.create({
				customer_id,
				total_amount,
				total_final_amount,
				invoice_address_id,
			});

			transaction.commit();
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't create bill", BillError.ERROR_CREATE);
		}
	}
}

module.exports = new BillService();
