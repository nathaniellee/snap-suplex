import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => ({
		type: actionTypes.ADD_WRESTLER_TO_MATCH,
		wrestler,
	}),

	decrementRoundNumber: () => ({ type: actionTypes.DECREMENT_ROUND_NUMBER }),

	incrementRoundNumber: () => ({ type: actionTypes.INCREMENT_ROUND_NUMBER }),

	setMaxRounds: (maxRounds) => ({
		type: actionTypes.SET_MAX_ROUNDS,
		maxRounds,
	}),

	startMatch: () => ({ type: actionTypes.START_MATCH }),
};
