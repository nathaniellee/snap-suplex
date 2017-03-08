import _ from 'lodash';
import { selectors } from '../../reducers/root';
import actionTypes from './actionTypes';

const addWrestler = (wrestler) => ({
	type: actionTypes.ADD_WRESTLER_TO_MATCH,
	wrestler,
});

const removeWrestler = (wrestler) => ({
	type: actionTypes.REMOVE_WRESTLER_FROM_MATCH,
	wrestler,
});

export default {
	addWrestler,
	removeWrestler,

	incrementRoundNumber: () => ({ type: actionTypes.INCREMENT_ROUND_NUMBER }),

	selectWrestler: (wrestler) => (dispatch, getState) => {
		const state = getState();
		const { wrestlers } = selectors.getMatch(state);

		if (_.includes(wrestlers, wrestler.id)) {
			dispatch(removeWrestler(wrestler));
		} else {
			dispatch(addWrestler(wrestler));
		}
	},

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
