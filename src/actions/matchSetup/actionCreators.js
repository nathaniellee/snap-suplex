import _ from 'lodash';
import { selectors } from '../../reducers/root';
import actionTypes from './actionTypes';

const addWrestler = (wrestler) => ({
	type: actionTypes.ADD_WRESTLER_TO_MATCH,
	wrestler,
});

const removeWrestler = (wrestlerId) => ({
	type: actionTypes.REMOVE_WRESTLER_FROM_MATCH,
	wrestlerId,
});

export default {
	addWrestler,
	removeWrestler,

	resetMatch: () => ({ type: actionTypes.RESET_MATCH }),

	resolveCurrentRound: (strategies) => ({
		type: actionTypes.RESOLVE_CURRENT_ROUND,
		strategies,
	}),

	selectWrestler: (wrestler) => (dispatch, getState) => {
		const state = getState();
		const { wrestlers } = selectors.getMatchSetup(state);
		const wrestlerId = wrestler.id;

		if (_.has(wrestlers, wrestlerId)) {
			dispatch(removeWrestler(wrestlerId));
		} else {
			dispatch(addWrestler({
				...wrestler,
				moves: _.reduce(wrestler.moves, (results, moveIds, statKey) => ({
					...results,
					[statKey]: _.map(moveIds, (moveId) => selectors.getMove(state, moveId)),
				}), {}),
			}));
		}
	},

	setDqRating: (dqRating) => ({
		type: actionTypes.SET_DQ_RATING,
		dqRating,
	}),

	setNumRounds: (numRounds) => ({
		type: actionTypes.SET_NUM_ROUNDS,
		numRounds,
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
