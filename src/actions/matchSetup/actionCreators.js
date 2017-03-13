import _ from 'lodash';
import { selectors } from '../../reducers/root';
import actionTypes from './actionTypes';

const addWrestler = (wrestlerId) => ({
	type: actionTypes.ADD_WRESTLER_TO_MATCH,
	wrestlerId,
});

const removeWrestler = (wrestlerId) => ({
	type: actionTypes.REMOVE_WRESTLER_FROM_MATCH,
	wrestlerId,
});

export default {
	addWrestler,
	removeWrestler,

	selectWrestler: (wrestlerId) => (dispatch, getState) => {
		const state = getState();
		const { wrestlers } = selectors.getMatchSetup(state);

		if (_.includes(wrestlers, wrestlerId)) {
			dispatch(removeWrestler(wrestlerId));
		} else if (_.size(wrestlers) < 2) {
			dispatch(addWrestler(wrestlerId));
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

	setStrategies: (strategies) => ({
		type: actionTypes.SET_STRATEGIES,
		strategies,
	}),

	startMatch: () => ({ type: actionTypes.START_MATCH }),
};
