const { BillError } = require("../constants/errorCode.constants");
const {
	Account,
	sequelize,
	InvoiceAddress,
	Invoice,
	InvoiceDetail,
	Inventory,
	Cart,
	Warehouse,
} = require("../models");
const {
	throwServerError,
	throwNotFoundError,
} = require("../utils/errorThrowFunc");

class InvoiceService {
	// TODO: cần phải xem xét về vấn đề khuyến mại product
	async createInvoice(
		account_id,
		cart,
		billDetail,
		promotion_id,
		discount_amount,
		total_final_amount
	) {
		const transaction = await sequelize.transaction();
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.customer_id;
		const total_amount = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);

		try {
			const [item] = await InvoiceAddress.findOrCreate({
				where: {
					first_name: billDetail.first_name,
					last_name: billDetail.last_name,
					email: billDetail.email,
					street_address: billDetail.street_address,
					city: billDetail.city,
					country: billDetail.country,
					zip_code: billDetail.zip_code,
					phone: billDetail.phone,
					customer_id,
				},
				transaction,
			});

			const invoice_address_id = item.invoice_address_id;

			const invoice = await Invoice.create(
				{
					customer_id,
					total_amount,
					total_final_amount,
					invoice_address_id,
					promotion_id,
					discount_amount,
					total_final_amount,
				},
				{ transaction }
			);

			const invoice_id = invoice.dataValues.invoice_id;

			for (let item of cart) {
				await InvoiceDetail.create(
					{
						invoice_id,
						product_id: item.id_product,
						quantity: item.quantity,
						unit_price: item.price,
						unit_final_amount: item.price * item.quantity,
						is_gift: "no",
					},
					{ transaction }
				);

				let qtyToDeduct = item.quantity;

				const inventories = await Inventory.findAll({
					include: [{ model: Warehouse, attributes: [] }],
					attributes: [
						"product_id",
						"quantity",
						"warehouse_id",
						"last_checked_at",
						[
							sequelize.col("Warehouse.priority"),
							"warehouse_priority",
						],
					],
					where: { product_id: item.id_product },
					order: [["warehouse_priority", "ASC"]],
					transaction,
				});

				for (let inv of inventories) {
					if (qtyToDeduct <= 0) break;

					const deduct = Math.min(inv.quantity, qtyToDeduct);

					await inv.decrement({ quantity: deduct }, { transaction });

					qtyToDeduct -= deduct;
				}
			}

			await Cart.destroy({ where: { customer_id }, transaction });

			transaction.commit();

			return invoice;
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't create bill", BillError.ERROR_CREATE);
		}
	}

	async getInvoiceDetail(invoice_id) {
		const invoice = await Invoice.findOne({ where: { invoice_id } });

		if (!invoice) {
			throwNotFoundError("Can't find invoice id", BillError.ERROR_ID);
		}

		const query = `
			SELECT
				-- InvoiceDetail
					id.invoice_id,
					id.quantity,
					id.unit_final_amount,

				-- Invoice
					i.discount_amount,
					i.total_final_amount,

				-- Product
					p.product_name,
					pi.image_url

			FROM invoice_detail id
				LEFT JOIN invoice i
					ON id.invoice_id = i.invoice_id
				LEFT JOIN product p
					ON id.product_id = p.product_id
				LEFT JOIN product_image pi
					ON p.product_id = pi.product_id

			WHERE
				id.invoice_id = :invoice_id 
				AND pi.is_main = :is_main
		`;

		const invoiceDetail = await sequelize.query(query, {
			replacements: { invoice_id: invoice_id, is_main: 1 },
			type: sequelize.QueryTypes.SELECT,
		});

		return invoiceDetail;
	}

	async getAllInvoiceDetail(account_id) {
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.dataValues.customer_id;

		const query = `
			SELECT
				-- InvoiceDetail
					id.invoice_id,
					id.quantity,
					id.unit_final_amount,

				-- Invoice
					i.discount_amount,
					i.total_final_amount,
					i.invoice_date,
					i.status,

				-- Product
					p.product_name,
					pi.image_url

			FROM invoice_detail id
				LEFT JOIN invoice i
					ON id.invoice_id = i.invoice_id
				LEFT JOIN product p
					ON id.product_id = p.product_id
				LEFT JOIN product_image pi
					ON p.product_id = pi.product_id

			WHERE 
				pi.is_main = :is_main
				AND i.customer_id = :customer_id
		`;

		const invoiceDetail = await sequelize.query(query, {
			replacements: { is_main: 1, customer_id },
			type: sequelize.QueryTypes.SELECT,
		});

		const invoices = [];

		invoiceDetail.forEach((row) => {
			let invoice = invoices.find(
				(inv) => inv.invoice_id === row.invoice_id
			);

			if (!invoice) {
				invoice = {
					invoice_id: row.invoice_id,
					discount_amount: Number(row.discount_amount),
					total_final_amount: Number(row.total_final_amount),
					invoice_date: row.invoice_date,
					status: row.status,
					products: [],
				};
				invoices.push(invoice);
			}

			invoice.products.push({
				quantity: row.quantity,
				unit_final_amount: Number(row.unit_final_amount),
				product_name: row.product_name,
				image_url: row.image_url,
			});
		});

		return invoices;
	}

	async getInvoice(invoice_id) {
		const invoice = await Invoice.findOne({ where: { invoice_id } });

		return invoice;
	}

	async deleteInvoice(invoice_id) {
		const transaction = await sequelize.transaction();

		try {
			await Invoice.destroy({ where: { invoice_id }, transaction });

			transaction.commit();
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError("Can't delete invoice", BillError.ERROR_DELETE);
		}
	}

	async getAddressShipping(account_id) {
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.customer_id;

		const attributes = Object.keys(InvoiceAddress.getAttributes()).filter(
			(attr) => attr !== "is_delete"
		);

		const invoiceAddress = await InvoiceAddress.findAll({
			attributes,
			where: { customer_id, is_delete: false },
		});

		return invoiceAddress;
	}

	async createInvoiceAddress(account_id, invoiceAddress) {
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.customer_id;
		const transaction = await sequelize.transaction();

		try {
			const invoiceAdd = await InvoiceAddress.create(
				{ ...invoiceAddress, customer_id },
				{ transaction }
			);

			transaction.commit();

			return invoiceAdd;
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't add invoice address",
				BillError.ERROR_ADD_ADDRESS
			);
		}
	}

	async deleteInvoiceAddress(invoice_address_id) {
		const transaction = await sequelize.transaction();

		try {
			await InvoiceAddress.update(
				{ is_delete: true },
				{ where: { invoice_address_id }, transaction }
			);

			transaction.commit();
		} catch (error) {
			transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't delete address",
				BillError.ERROR_DELETE_ADDRESS
			);
		}
	}
}

module.exports = new InvoiceService();
