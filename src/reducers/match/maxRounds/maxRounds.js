import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';

const maxRounds = (state = 1, action) => {
	switch (action.type) {
		case actionTypes.SET_MAX_ROUNDS: {
			return action.maxRounds;
		}

		default: {
			return state;
		}
	}
};

export default maxRounds;
export const get = _.identity;
