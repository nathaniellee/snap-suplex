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

const toHitModifierMap = {
	1: [0, -1, -2, -3],
	2: [0, 0, -1, -2],
	3: [0, 0, 0, -1],
	4: [0, 0, 0, 0],
};

// Returns the to-hit modifier for the provided health level and round level.
export const getToHitModifier = (healthLevel, roundLevel) => {
	const modifiers = _.get(toHitModifierMap, healthLevel);
	return _.nth(modifiers, roundLevel);
};

// Returns whether a roll is successful against the provided value.
export const roll = (value) => (_.random(1, 10) <= value);

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
			result: roll(getHighestStat(stats)),
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
	const attackerSucceeded = roll(attackerStat + attackerToHitModifier);
	const defenderSucceeded = roll(defenderStat + defenderToHitModifier);

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

// Returns the pin rating associated with the provided health value.
const getPinRating = (health) => _.ceil(health / 5) + 1;

// Returns the number of failed pin attempt rolls by the defender.
export const getPinAttemptResults = (defenderHealth, numRolls) => {
	const pinRating = getPinRating(defenderHealth);
	let numFailures = 0;

	for (let i = 0; i < numRolls; i++) {
		if (roll(pinRating)) {
			return numFailures;
		} else {
			numFailures += 1;
		}
	}

	return numFailures;
};

// Returns the submission rating associated with the provided health value.
const getSubmissionRating = (health) => _.ceil(health / 5) + 1;

// Returns the number of failed submission attempt rolls by the defender.
export const getSubmissionAttemptResults = (defenderHealth, numRolls) => {
	const submissionRating = getSubmissionRating(defenderHealth);
	let numFailures = 0;

	for (let i = 0; i < numRolls; i++) {
		if (roll(submissionRating)) {
			return numFailures;
		} else {
			numFailures += 1;
		}
	}

	return numFailures;
};
