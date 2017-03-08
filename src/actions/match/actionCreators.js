import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => ({
		type: actionTypes.ADD_WRESTLER_TO_MATCH,
		wrestler,
	}),

	incrementRoundNumber: () => ({ type: actionTypes.INCREMENT_ROUND_NUMBER }),

	removeWrestler: (wrestler) => ({
		type: actionTypes.REMOVE_WRESTLER_FROM_MATCH,
		wrestler,
	}),

	setDqRating: (dqRating) => ({
		type: actionTypes.SET_DQ_RATING,
		dqRating,
	}),

	setMaxRounds: (maxRounds) => ({
		type: actionTypes.SET_MAX_ROUNDS,
		maxRounds,
	}),

	setPageIndex: (pageIndex) => ({
		type: actionTypes.SET_PAGE_INDEX,
		pageIndex,
	}),

	setRefScore: (refScore) => ({
		type: actionTypes.SET_REF_SCORE,
		refScore,
	}),

	startMatch: () => ({ type: actionTypes.START_MATCH }),
};
