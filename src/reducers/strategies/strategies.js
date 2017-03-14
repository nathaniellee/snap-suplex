import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const defaultState = {
	byId: {},
	allIds: [],
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case actionTypes.FETCH_STRATEGIES_SUCCESS: {
			return action.strategies;
		}

		default: {
			return state;
		}
	}
};

export const selectors = {
	getStrategy: (state, id) => _.get(state.byId, id, null),
	getStrategyIds: (state) => state.allIds,
	getStrategiesAsArray: (state) => _.map(state.byId, _.identity),
	getStrategiesAsMap: (state) => state.byId,
};
