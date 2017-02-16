import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';

const roundNumber = (state = 1, action) => {
	switch (action.type) {
		case actionTypes.INCREMENT_ROUND_NUMBER: {
			return state + 1;
		}

		case actionTypes.DECREMENT_ROUND_NUMBER: {
			return state - 1;
		}

		case actionTypes.START_MATCH: {
			return 1;
		}

		default: {
			return state;
		}
	}
};

export default roundNumber;
export const get = _.identity;
