import actionTypes from './actionTypes';

export default {
	addMove: (move) => ({
		type: actionTypes.ADD_MOVE,
		move,
	}),

	setMoves: (moves) => ({
		type: actionTypes.SET_MOVES,
		moves,
	}),

	updateMove: (move) => ({
		type: actionTypes.UPDATE_MOVE,
		move,
	}),
};
