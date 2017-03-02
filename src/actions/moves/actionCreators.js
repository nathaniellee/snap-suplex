import actionTypes from './actionTypes';

export default {
	addMove: (move) => ({
		type: actionTypes.ADD_MOVE,
		move,
	}),

	updateMove: (move) => ({
		type: actionTypes.UPDATE_MOVE,
		move,
	}),
};
