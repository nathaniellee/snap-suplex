import actionTypes from './actionTypes';

export default {
	fetchMovesRequest: () => ({ type: actionTypes.FETCH_MOVES_REQUEST }),
	fetchMovesSuccess: (moves) => ({
		type: actionTypes.FETCH_MOVES_SUCCESS,
		moves,
	}),
	fetchMovesFailure: (error) => ({
		type: actionTypes.FETCH_MOVES_FAILURE,
		error,
	}),
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
