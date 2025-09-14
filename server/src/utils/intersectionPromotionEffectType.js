export const intersectionPromotionEffectType = (
	listPromotionEffectType,
	listRuleTypeLength
) => {
	const count = {};
	const occurrences = {};

	listPromotionEffectType.forEach((item) => {
		const e = item.PromotionEffectType;
		occurrences[e.effect_type_id] =
			(occurrences[e.effect_type_id] || 0) + 1;
		count[e.effect_type_id] = e;
	});

	const intersection = Object.values(count).filter(
		(e) => occurrences[e.effect_type_id] === listRuleTypeLength
	);

	return intersection;
};
