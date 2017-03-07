import actionTypes from './actionTypes';

export default {
	setWrestlers: (wrestlers) => ({
		type: actionTypes.SET_WRESTLERS,
		wrestlers,
	}),
	postMoveRequest: () => ({ type: actionTypes.POST_MOVE_REQUEST }),
	postMoveSuccess: (move) => ({
		type: actionTypes.POST_MOVE_SUCCESS,
		move,
	}),
	postMoveFailure: (error) => ({
		type: actionTypes.POST_MOVE_FAILURE,
		error,
	}),
	putMoveRequest: () => ({ type: actionTypes.PUT_MOVE_REQUEST }),
	putMoveSuccess: (move) => ({
		type: actionTypes.PUT_MOVE_SUCCESS,
		move,
	}),
	putMoveFailure: (error) => ({
		type: actionTypes.PUT_MOVE_FAILURE,
		error,
	}),
	postWrestlerRequest: () => ({ type: actionTypes.POST_WRESTLER_REQUEST}),
	postWrestlerSuccess: (wrestler) => ({
		type: actionTypes.POST_WRESTLER_SUCCESS,
		wrestler,
	}),
	postWrestlerFailure: (error) => ({
		type: actionTypes.POST_WRESTLER_FAILURE,
		error,
	}),
	putWrestlerRequest: () => ({ type: actionTypes.PUT_WRESTLER_REQUEST}),
	putWrestlerSuccess: (wrestler) => ({
		type: actionTypes.PUT_WRESTLER_SUCCESS,
		wrestler,
	}),
	putWrestlerFailure: (error) => ({
		type: actionTypes.PUT_WRESTLER_FAILURE,
		error,
	}),
};
