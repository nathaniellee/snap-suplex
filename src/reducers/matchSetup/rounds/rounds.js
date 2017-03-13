import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';
import {
	defaultMaxRounds,
	getDefaultStrategies,
} from '../../../constants/defaults';

const getDefaultState = () => ({
	maxRounds: defaultMaxRounds,
	strategies: {},
});

const rounds = (state = getDefaultState(), action = {}) => {
	switch (action.type) {
		case actionTypes.SET_MAX_ROUNDS: {
			const { maxRounds } = action;
			const { strategies } = state;
			const updatedStrategies = _.reduce(strategies, (results, strats, key) => {
				const stratCount = _.size(strats);

				if (maxRounds < stratCount) {
					return {
						...results,
						[key]: _.take(strats, maxRounds),
					};
				}

				if (maxRounds > stratCount) {
					const difference = maxRounds - stratCount;
					return {
						...results,
						[key]: [
							...strats,
							...getDefaultStrategies(difference),
						],
					};
				}

				return strats;
			}, {});

			return {
				maxRounds,
				strategies: updatedStrategies,
			};
		}

		case actionTypes.SET_STRATEGIES: {
			return {
				...state,
				strategies: action.strategies,
			};
		}

		case actionTypes.ADD_WRESTLER_TO_MATCH: {
			return {
				...state,
				strategies: {
					...state.strategies,
					[action.wrestlerId]: getDefaultStrategies(state.maxRounds),
				},
			};
		}

		case actionTypes.REMOVE_WRESTLER_FROM_MATCH: {
			return {
				...state,
				strategies: _.omit(state.strategies, [action.wrestlerId]),
			};
		}

		default: {
			return state;
		}
	}
};

export default rounds;

export const selectors = {
	get: _.identity,
	getMaxRounds: (state) => state.maxRounds,
	getStrategies: (state) => state.strategies,
	getStrategyByWrestlerId: (state, wrestlerId) => _.get(state.strategies, wrestlerId, null),
};
