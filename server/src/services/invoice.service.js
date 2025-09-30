const { BillError } = require('../constants/errorCode.constants');
const {
    Account,
    sequelize,
    InvoiceAddress,
    Invoice,
    InvoiceDetail,
    Inventory,
    Cart,
    Customer,
    Warehouse,
    WarehouseExport,
    WarehouseExportItem,
    InventoryAudit,
    InvoiceAudit,
} = require('../models');
const {
    throwServerError,
    throwNotFoundError,
} = require('../utils/errorThrowFunc');
const warehouseService = require('./warehouse.service');

class InvoiceService {
    async createInvoice(
        account_id,
        cart,
        billDetail,
        promotion_id,
        discount_amount,
        total_final_amount,
    ) {
        const transaction = await sequelize.transaction();
        const account = await Account.findOne({ where: { account_id } });
        const customer_id = account.customer_id;
        const total_amount = cart.reduce((acc, item) => {
            const price =
                item.discountPrice !== null && item.discountPrice !== undefined
                    ? item.discountPrice
                    : item.price;

            return acc + price * item.quantity;
        }, 0);

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
                },
                { transaction },
            );

            const invoice_id = invoice.dataValues.invoice_id;

            for (let item of cart) {
                const promotion_product_id = item.promotion
                    ? item.promotion.promotion_id
                    : null;

                await InvoiceDetail.create(
                    {
                        invoice_id,
                        product_id: item.id_product,
                        quantity: item.quantity,
                        unit_price: item.price,
                        unit_final_amount: item.price * item.quantity,
                        is_gift: 'no',
                        discount:
                            item.promotion?.PromotionEffects?.effect_value | 0,
                        promotion_id: promotion_product_id,
                    },
                    { transaction },
                );
            }

            await Cart.destroy({ where: { customer_id }, transaction });

            await transaction.commit();

            return invoice;
        } catch (error) {
            await transaction.rollback();

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
					id.discount as discount_product,

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
					id.discount as discount_product,

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
					ON p.product_id = pi.product_id AND pi.is_main = true

			WHERE 
				i.customer_id = :customer_id

			ORDER BY
				i.invoice_date DESC
		`;

        const invoiceDetail = await sequelize.query(query, {
            replacements: { is_main: 1, customer_id },
            type: sequelize.QueryTypes.SELECT,
        });

        const invoices = [];

        invoiceDetail.forEach((row) => {
            let invoice = invoices.find(
                (inv) => inv.invoice_id === row.invoice_id,
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

    async deleteInvoice(invoice_id, account_id) {
        const transaction = await sequelize.transaction();

        try {
            const account = await Account.findOne({ where: { account_id } });
            const customer_id = account.customer_id;

            const invoice = await Invoice.findOne({ where: { invoice_id } });
            const old_status = invoice.status;

            await Invoice.update(
                { status: 'cancelled' },
                { where: { invoice_id }, transaction },
            );

            await InvoiceAudit.create(
                {
                    invoice_id,
                    old_status,
                    new_status: 'cancelled',
                    changed_by: customer_id,
                    changed_by_type: 'CUSTOMER',
                },
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            throwServerError("Can't delete invoice", BillError.ERROR_DELETE);
        }
    }

    async getAddressShipping(account_id) {
        const account = await Account.findOne({ where: { account_id } });
        const customer_id = account.customer_id;

        const attributes = Object.keys(InvoiceAddress.getAttributes()).filter(
            (attr) => attr !== 'is_delete',
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
                { transaction },
            );

            await transaction.commit();

            return invoiceAdd;
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            throwServerError(
                "Can't add invoice address",
                BillError.ERROR_ADD_ADDRESS,
            );
        }
    }

    async deleteInvoiceAddress(invoice_address_id) {
        const transaction = await sequelize.transaction();

        try {
            await InvoiceAddress.update(
                { is_delete: true },
                { where: { invoice_address_id }, transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            throwServerError(
                "Can't delete address",
                BillError.ERROR_DELETE_ADDRESS,
            );
        }
    }

    async getOrdersList(limit, offset) {
        const orderList = await Invoice.findAll({
            include: [
                {
                    model: Customer,
                    attributes: [],
                    include: [
                        {
                            model: Account,
                            attributes: [],
                        },
                    ],
                },
            ],
            attributes: [
                'invoice_id',
                'total_final_amount',
                'status',
                'invoice_date',
                'discount_amount',
                [sequelize.col('Customer.Account.email'), 'email'],
            ],
            limit,
            offset,
            order: [['invoice_date', 'DESC']],
        });

        const total = await Invoice.count();
        const hasMore = offset + orderList.length < total;

        return { orderList, hasMore };
    }

    async updateOrderStatus(status, reason, invoice_id, account_id) {
        const transaction = await sequelize.transaction();

        const account = await Account.findOne({ where: { account_id } });
        const employee_id = account.employee_id;

        try {
            let res = null;

            const invoice = await Invoice.findOne({
                where: { invoice_id },
                include: [{ model: InvoiceDetail }],
                transaction,
            });

            if (!invoice) {
                throwNotFoundError("Can't find invoice", BillError.ERROR_ID);
            }

            const oldStatus = invoice.status;

            await Invoice.update(
                { status, employee_id },
                { where: { invoice_id }, transaction },
            );

            await InvoiceAudit.create(
                {
                    invoice_id,
                    old_status: oldStatus,
                    new_status: status,
                    changed_by: employee_id,
                    reason,
                },
                { transaction },
            );

            if (status === 'paid') {
                const exportRecord = await WarehouseExport.create(
                    {
                        invoice_id,
                        employee_id,
                        reason: `Export for invoice ${invoice_id}`,
                    },
                    { transaction },
                );

                const export_id = exportRecord.export_id;

                for (let item of invoice.InvoiceDetails) {
                    let qtyToDeduct = item.quantity;

                    const inventories = await Inventory.findAll({
                        include: [{ model: Warehouse, attributes: [] }],
                        attributes: [
                            'product_id',
                            'quantity',
                            'warehouse_id',
                            'last_checked_at',
                            [
                                sequelize.col('Warehouse.priority'),
                                'warehouse_priority',
                            ],
                        ],
                        where: { product_id: item.product_id },
                        order: [['warehouse_priority', 'ASC']],
                        transaction,
                    });

                    for (let inv of inventories) {
                        if (qtyToDeduct <= 0) break;

                        const deduct = Math.min(inv.quantity, qtyToDeduct);

                        await inv.decrement(
                            { quantity: deduct },
                            { transaction },
                        );

                        await InventoryAudit.create(
                            {
                                warehouse_id: inv.warehouse_id,
                                product_id: inv.product_id,
                                old_quantity: inv.quantity,
                                new_quantity: inv.quantity - deduct,
                                change_amount: -deduct,
                                action: 'invoice_paid',
                                employee_id,
                            },
                            { transaction },
                        );

                        if (deduct > 0) {
                            await WarehouseExportItem.create(
                                {
                                    export_id,
                                    product_id: inv.product_id,
                                    warehouse_id: inv.warehouse_id,
                                    quantity: deduct,
                                },
                                { transaction },
                            );
                        }

                        qtyToDeduct -= deduct;
                    }
                }

                res = {
                    message: `Invoice #${invoice_id} paid`,
                    success: true,
                };
            }

            if (status === 'refunded') {
                await warehouseService.createRefundImport(
                    account_id,
                    invoice_id,
                    transaction,
                );

                res = {
                    message: `Refund import created for invoice #${invoice_id}`,
                    success: true,
                };
            }

            await transaction.commit();

            return res;
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            throwServerError(
                "Can't update status invoice",
                BillError.ERROR_UPDATE_STATUS,
            );
        }
    }

    async refundedInvoice(invoice_id, account_id, reason) {
        const transaction = await sequelize.transaction();

        try {
            const invoice = await Invoice.findOne({ where: { invoice_id } });
            const old_status = invoice.status;

            const account = await Account.findOne({ where: { account_id } });
            const customer_id = account.customer_id;

            await Invoice.update(
                { status: 'refund_requested' },
                { where: { invoice_id }, transaction },
            );

            await InvoiceAudit.create(
                {
                    invoice_id,
                    old_status,
                    new_status: 'refund_requested',
                    changed_by: customer_id,
                    changed_by_type: 'CUSTOMER',
                    reason,
                },
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            throwServerError("Can't delete invoice", BillError.ERROR_DELETE);
        }
    }
}

module.exports = new InvoiceService();
