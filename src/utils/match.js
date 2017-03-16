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

export const getInitialHealth = (stamina) => _.chain(healthLevelsMap)
	.get(stamina)
	.head()
	.value();

// Simulate the roll of a 10-sided die.
const roll = () => _.random(1, 10);

// Returns whether a roll is successful against the provided stat value.
const statRoll = (stat) => (roll() <= stat);

const getHighestStat = (stats) => _.chain(stats)
	.map(_.identity)
	.max()
	.value();

// Returns the id of the wrestler who wins the initiative roll.
export const getInitiativeWinner = (wrestlers) => {
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
		return _.find(wrestlers, { id: winnerId });
	}

	return getInitiativeWinner(wrestlers);
};
