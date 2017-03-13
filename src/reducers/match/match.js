import _ from 'lodash';
import { combineReducers } from 'redux';
import actionTypes from '../../actions/actionTypes';

const isMatchUnderway = (state = false, action = {}) => {
	switch (action.type) {
		case actionTypes.START_MATCH: {
			return true;
		}

		default: {
			return state;
		}
	}
};

export default combineReducers({
	isMatchUnderway,
});

export const selectors = {
	get: _.identity,
};
