import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => ({
		type: actionTypes.ADD_WRESTLER,
		wrestler,
	}),

	setWrestlers: (wrestlers) => ({
		type: actionTypes.SET_WRESTLERS,
		wrestlers,
	}),
};
