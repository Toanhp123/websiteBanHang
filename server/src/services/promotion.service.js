const { sequelize } = require("../models");
const { applyPromotion } = require("../utils/handleDiscount");

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
}

module.exports = new PromotionService();
