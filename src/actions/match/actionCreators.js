import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => ({
		type: actionTypes.ADD_WRESTLER_TO_MATCH,
		wrestler,
	}),

	incrementRoundNumber: () => ({ type: actionTypes.INCREMENT_ROUND_NUMBER }),

	setMaxRounds: (maxRounds) => ({
		type: actionTypes.SET_MAX_ROUNDS,
		maxRounds,
	}),

	setRefScore: (refScore) => ({
		type: actionTypes.SET_REF_SCORE,
		refScore,
	}),

	startMatch: () => ({ type: actionTypes.START_MATCH }),
};
