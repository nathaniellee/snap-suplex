import _ from 'lodash';

const healthLevelsMap = {
	1: [5, 3, 2, 1],
	2: [10, 6, 3, 1],
	3: [15, 9, 5, 2],
	4: [20, 12, 6, 2],
	5: [25, 15, 8, 3],
	6: [30, 18, 9, 3],
	7: [35, 21, 11, 4],
	8: [40, 24, 12, 4],
};

const toHitModifierMap = {
	1: [0, -1, -2, -3],
	2: [0, 0, -1, -2],
	3: [0, 0, 0, -1],
	4: [0, 0, 0, 0],
};

// Returns the starting health for the provided stamina.
export const getInitialHealth = (stamina) => _.chain(healthLevelsMap)
	.get(stamina)
	.head()
	.value();

// Returns the health level for the provided stamina and health values.
export const getHealthLevel = (stamina, health) => {
	const thresholds = _.get(healthLevelsMap, stamina);
	const index = _.findLastIndex(thresholds, (threshold) => (health <= threshold));
	return index + 1;
};

// Returns the to-hit modifier for the provided health level and round level.
export const getToHitModifier = (healthLevel, roundLevel) => {
	const modifiers = _.get(toHitModifierMap, healthLevel);
	return _.nth(modifiers, roundLevel);
};

// Simulate the roll of a 10-sided die.
const roll = () => _.random(1, 10);

// Returns whether a roll is successful against the provided stat value.
const statRoll = (stat) => (roll() <= stat);

// Returns the highest stat value.
const getHighestStat = (stats) => _.chain(stats)
	.map(_.identity)
	.max()
	.value();

// Returns the winner and loser of the initiative rolls.
export const getInitiative = (wrestlers) => {
	const results = _.chain(wrestlers)
		.map(({
			id,
			stats,
		}) => ({
			id,
			result: statRoll(getHighestStat(stats)),
		}))
		.filter(({
			id,
			result,
		}) => result)
		.value();

	if (_.size(results) === 1) {
		const winnerId = _.head(results).id;
		const loserId = _.chain(wrestlers)
			.keys()
			.map(_.toNumber)
			.without(winnerId)
			.head()
			.value();
		return {
			winnerId,
			loserId,
		};
	}

	return getInitiative(wrestlers);
};

// Returns true if the attacker won the round and false if the defender won.
export const getToHitResults = ({
  attackerStat,
  attackerToHitModifier,
  defenderStat,
  defenderToHitModifier,
}) => {
	const attackerSucceeded = statRoll(attackerStat + attackerToHitModifier);
	const defenderSucceeded = statRoll(defenderStat + defenderToHitModifier);

	if (attackerSucceeded) {
		return {
			attackerWon: true,
			attackerSucceeded,
			defenderSucceeded,
		};
	}

	if (defenderSucceeded) {
		return {
			attackerWon: false,
			attackerSucceeded,
			defenderSucceeded,
		};
	}

	return getToHitResults({
	  attackerStat,
	  attackerToHitModifier,
	  defenderStat,
	  defenderToHitModifier,
	});
};
