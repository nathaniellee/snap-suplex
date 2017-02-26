const specialtyStatCostMap = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 7,
	7: 9,
	8: 12,
};

const staminaStatCostMap = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 6,
	6: 9,
	7: 13,
	8: 18,
};

export const getSpecialtyStatCost = (value) => specialtyStatCostMap[value];
export const getStaminaStatCost = (value) => staminaStatCostMap[value];
