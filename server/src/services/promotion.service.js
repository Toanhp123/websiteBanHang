const { PromotionError } = require("../constants/errorCode.constants");
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
} = require("../models");
const { throwServerError } = require("../utils/errorThrowFunc");
const { applyPromotion } = require("../utils/handleDiscount");
const {
	intersectionPromotionEffectType,
} = require("../utils/intersectionPromotionEffectType");

class PromotionService {
	async getDetailPromotion(promotion_id) {
		const query = `	
			SELECT 
			-- Promotion
    			p.promotion_id,
    			p.promotion_name,
    			p.valid_from,
    			p.valid_to,
    			p.distribution_type,
    			p.range_apply,
		
    		-- Effect
    			pet.effect_type_name,
   				pe.product_id AS effect_product_id,
				pe.effect_value,
		
    		-- Rule
    			prt.rule_type_name,
    			pr.rule_operator,
				pr.rule_value,
    			pr.product_id AS rule_product_id
		
			FROM promotion p
				LEFT JOIN promotion_effect pe 
    				ON p.promotion_id = pe.promotion_id
				LEFT JOIN promotion_effect_type pet 
    				ON pe.effect_type_id = pet.effect_type_id
				LEFT JOIN promotion_rule pr 
    				ON p.promotion_id = pr.promotion_id
				LEFT JOIN promotion_rule_type prt 
    				ON pr.rule_type_id = prt.rule_type_id
			WHERE
				p.promotion_id = :promotion_id
		`;

		const promotion = await sequelize.query(query, {
			replacements: { promotion_id: promotion_id },
			type: sequelize.QueryTypes.SELECT,
		});

		return promotion[0];
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
}

module.exports = new PromotionService();
