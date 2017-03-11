import _ from 'lodash';
import { combineReducers } from 'redux';
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
