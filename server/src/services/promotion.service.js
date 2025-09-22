const { Op } = require("sequelize");
const {
	PromotionError,
	AccountStatus,
} = require("../constants/errorCode.constants");
const { RulePromotion } = require("../constants/promotion.constants");
const {
	sequelize,
	PromotionRuleType,
	PromotionRule,
	PromotionRangeRuleCompatibility,
	PromotionRuleCompatibility,
	RuleEffectCompatibility,
	PromotionEffectType,
	Promotion,
	PromotionProduct,
	PromotionEffect,
	PromotionCategory,
	CustomerPromotion,
	Account,
} = require("../models");
const { throwServerError } = require("../utils/errorThrowFunc");
const { applyPromotion } = require("../utils/handleDiscount");
const {
	intersectionPromotionEffectType,
} = require("../utils/intersectionPromotionEffectType");

class PromotionService {
	async getDetailPromotion(promotion_id) {
		const promotion = await Promotion.findOne({
			where: { promotion_id },
			include: [
				{
					model: PromotionEffect,
					include: [{ model: PromotionEffectType }],
				},
				{
					model: PromotionRule,
					include: [{ model: PromotionRuleType }],
				},
			],
		});

		const plain = promotion.get({ plain: true });

		return {
			promotion_id: plain.promotion_id,
			promotion_name: plain.promotion_name,
			promotion_status: plain.promotion_status,
			valid_from: plain.valid_from,
			valid_to: plain.valid_to,
			distribution_type: plain.distribution_type,
			range_apply: plain.range_apply,
			created_at: plain.created_at,

			effects: plain.PromotionEffects.map((e) => ({
				effect_id: e.effect_id,
				effect_value: e.effect_value,
				product_id: e.product_id,
				effect_type: e.PromotionEffectType?.effect_type_name,
				effect_type_id: e.PromotionEffectType?.effect_type_id,
				effect_description:
					e.PromotionEffectType?.effect_type_description,
			}))[0],

			rules: plain.PromotionRules.map((r) => ({
				rule_id: r.rule_id,
				rule_value: r.rule_value,
				rule_operator: r.rule_operator,
				rule_type_id: r.rule_type_id,
				product_id: r.product_id,
				product_category_id: r.product_category_id,
				rule_type: r.PromotionRuleType?.rule_type_name,
				rule_description: r.PromotionRuleType?.rule_type_description,
				template: r.PromotionRuleType?.rule_value_template,
			})),
		};
	}

	async checkPromotionCanApply(promotion, cart) {
		const res = applyPromotion(promotion, cart);

		return res;
	}

	async getAllPromotionRuleType(range_apply) {
		if (range_apply) {
			const mainRules = await PromotionRangeRuleCompatibility.findAll({
				include: [
					{
						model: PromotionRuleType,
						attributes: [],
					},
				],
				attributes: [
					"rule_type_id",
					[
						sequelize.col("PromotionRuleType.rule_type_name"),
						"rule_type_name",
					],
					[
						sequelize.col(
							"PromotionRuleType.rule_type_description"
						),
						"rule_type_description",
					],
					[
						sequelize.col("PromotionRuleType.rule_value_template"),
						"rule_value_template",
					],
				],
				where: { range_apply },
				raw: true,
				nest: true,
			});

			const result = await Promise.all(
				mainRules.map(async (rule) => {
					const compatible = await PromotionRuleCompatibility.findAll(
						{
							include: [
								{
									model: PromotionRuleType,
									as: "compatibleRuleType",
									attributes: [
										"rule_type_id",
										"rule_type_name",
										"rule_type_description",
										"rule_value_template",
									],
								},
							],
							attributes: [],
							where: { main_rule_type_id: rule.rule_type_id },
							raw: true,
							nest: true,
						}
					);

					return {
						...rule,
						compatible_rules: compatible.map(
							(c) => c.compatibleRuleType
						),
					};
				})
			);

			return result;
		}
	}

	async getAllPromotionEffectType(listRuleType) {
		const effectTypeList = await RuleEffectCompatibility.findAll({
			include: [
				{
					model: PromotionEffectType,
				},
			],
			attributes: [],
			where: { rule_type_id: listRuleType },
			raw: true,
			nest: true,
		});

		const result = intersectionPromotionEffectType(
			effectTypeList,
			listRuleType.length
		);

		return result;
	}

	async createPromotion(data) {
		const transaction = await sequelize.transaction();
		const info = data.info;
		const rules = data.rules;
		const effect = data.effect;

		try {
			const promotion = await Promotion.create(
				{ ...info },
				{ transaction }
			);

			const promotion_id = promotion.promotion_id;

			const listRule = rules.map((rule) => {
				return {
					promotion_id,
					rule_type_id: rule.rule_type_id,
					rule_operator: rule.rule_operator,
					rule_value: rule.rule_value ? rule.rule_value : null,
					product_id: rule.product_id ? rule.product_id : null,
					product_category_id: rule.product_category_id
						? rule.product_category_id
						: null,
				};
			});

			await PromotionRule.bulkCreate(listRule, {
				transaction,
			});

			await PromotionEffect.create(
				{
					promotion_id,
					effect_type_id: effect.effect_type_id,
					effect_value: effect.effect_value
						? effect.effect_value
						: null,
					product_id: effect.product_id ? effect.product_id : null,
				},
				{ transaction }
			);

			if (info.range_apply === "product") {
				if (rules[0].rule_type_id === RulePromotion.PRODUCT_ID) {
					await PromotionProduct.create(
						{
							promotion_id,
							product_id: rules[0].product_id,
						},
						{ transaction }
					);
				}

				if (rules[0].rule_type_id === RulePromotion.PRODUCT_CATEGORY) {
					await PromotionCategory.create(
						{
							promotion_id,
							product_category_id: rules[0].product_category_id,
						},
						{ transaction }
					);
				}
			}

			if (info.range_apply === "invoice") {
				await CustomerPromotion.create(
					{
						promotion_id,
						all_customers: true,
					},
					{ transaction }
				);
			}

			transaction.commit();

			return { message: "Create discount success", success: true };
		} catch (error) {
			transaction.rollback();
			console.log(error);

			throwServerError(
				"Can't create discount",
				PromotionError.CREATE_ERROR
			);
		}
	}

	async getPromotionForProducts(productIds, categoryIds) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		let promotions = await Promotion.findAll({
			include: [
				{
					model: PromotionProduct,
					attributes: ["product_id"],
					required: false,
					where: { product_id: productIds },
				},
				{
					model: PromotionCategory,
					attributes: ["product_category_id"],
					as: "PromotionCategory",
					required: false,
					where: { product_category_id: categoryIds },
				},
				{
					model: PromotionEffect,
					attributes: [
						"effect_type_id",
						"effect_value",
						"product_id",
					],
					required: true,
				},
			],
			where: {
				range_apply: "product",
				promotion_status: "active",
				valid_from: { [Op.lte]: today },
				valid_to: { [Op.gte]: today },
				[Op.or]: [
					{ "$PromotionProducts.product_id$": { [Op.ne]: null } },
					{
						"$PromotionCategory.product_category_id$": {
							[Op.ne]: null,
						},
					},
				],
			},
			raw: true,
			nest: true,
		});

		promotions = promotions.sort((a, b) => {
			// 1 = product, 2 = category
			const aType = a.PromotionProducts?.product_id ? 1 : 2;
			const bType = b.PromotionProducts?.product_id ? 1 : 2;

			if (aType !== bType) return aType - bType;
			return (
				// mới trước
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime()
			);
		});

		return promotions;
	}

	async getAllPromotion(limit, offset) {
		const promotion = await Promotion.findAll({
			limit,
			offset,
		});

		const total = await Promotion.count();

		return { data: promotion, total };
	}

	async changePromotionStatus(promotion_id, promotion_status) {
		const transaction = await sequelize.transaction();

		try {
			const promotion = await Promotion.findOne({
				where: { promotion_id },
			});

			const now = new Date();

			if (
				promotion.valid_to &&
				new Date(promotion.valid_to) < now &&
				promotion_status.toLowerCase() !== "deleted"
			) {
				console.log(promotion_status.toLowerCase());

				promotion_status = "expired";
			} else {
				promotion_status = promotion_status.toLowerCase();
			}

			await Promotion.update(
				{ promotion_status },
				{ where: { promotion_id }, transaction }
			);

			await transaction.commit();

			return { message: "Change status success", success: true };
		} catch (error) {
			await transaction.rollback();

			console.log(error);

			throwServerError(
				"Can't change promotion status",
				PromotionError.CREATE_ERROR
			);
		}
	}

	async getAllPromotionThisCustomer(account_id) {
		const account = await Account.findOne({ where: { account_id } });
		const customer_id = account.customer_id;
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const allPromotion = await Promotion.findAll({
			where: {
				promotion_status: "active",
				valid_from: { [Op.lte]: today },
				valid_to: { [Op.gte]: today },
			},
			include: [
				{
					model: CustomerPromotion,
					required: true,
					where: {
						[Op.or]: [
							{ all_customers: 1 },
							{ customer_id: customer_id },
						],
					},
				},
				{
					model: PromotionEffect,
					include: [{ model: PromotionEffectType }],
				},
				{
					model: PromotionRule,
					include: [{ model: PromotionRuleType }],
				},
			],
			order: [["created_at", "DESC"]],
		});

		return allPromotion.map((promotion) => {
			const plain = promotion.get({ plain: true });

			return {
				promotion_id: plain.promotion_id,
				promotion_name: plain.promotion_name,
				promotion_status: plain.promotion_status,
				valid_from: plain.valid_from,
				valid_to: plain.valid_to,
				distribution_type: plain.distribution_type,
				range_apply: plain.range_apply,
				created_at: plain.created_at,

				effects: plain.PromotionEffects.map((e) => ({
					effect_id: e.effect_id,
					effect_value: e.effect_value,
					product_id: e.product_id,
					effect_type: e.PromotionEffectType?.effect_type_name,
					effect_type_id: e.PromotionEffectType?.effect_type_id,
					effect_description:
						e.PromotionEffectType?.effect_type_description,
				}))[0],

				rules: plain.PromotionRules.map((r) => ({
					rule_id: r.rule_id,
					rule_value: r.rule_value,
					rule_operator: r.rule_operator,
					product_id: r.product_id,
					rule_type_id: r.rule_type_id,
					product_category_id: r.product_category_id,
					rule_type: r.PromotionRuleType?.rule_type_name,
					rule_description:
						r.PromotionRuleType?.rule_type_description,
					template: r.PromotionRuleType?.rule_value_template,
				})),
			};
		});
	}
}

module.exports = new PromotionService();
