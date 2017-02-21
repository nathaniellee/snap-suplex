import actionTypes from './actionTypes';

export default {
	fetchWrestlersRequest: () => ({ type: actionTypes.FETCH_WRESTLERS_REQUEST }),
	fetchWrestlersSuccess: (wrestlers) => ({
		type: actionTypes.FETCH_WRESTLERS_SUCCESS,
		wrestlers,
	}),
	fetchWrestlersFailure: (error) => ({
		type: actionTypes.FETCH_WRESTLERS_FAILURE,
		error,
	}),
};
