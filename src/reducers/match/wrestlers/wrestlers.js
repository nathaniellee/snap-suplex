import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';

const wrestlers = (state = [], action) => {
	switch (action.type) {
		case actionTypes.ADD_WRESTLER_TO_MATCH: {
			return _.uniqBy([
				...state,
				action.wrestler,
			], 'id');
		}

		default: {
			return state;
		}
	}
};

export default wrestlers;
export const get = _.identity;
