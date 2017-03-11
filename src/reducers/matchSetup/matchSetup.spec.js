import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import roundsReducer, { selectors as roundsSelectors } from './rounds/rounds';
import reducer, { selectors } from './matchSetup';

const {
	ADD_WRESTLER_TO_MATCH,
	REMOVE_WRESTLER_FROM_MATCH,
	SET_DQ_RATING,
	SET_PAGE_INDEX,
	SET_REF_SCORE,
} = actionTypes;

describe('matchSetup', () => {
	let roundsState;
	let state;
	let addWrestlerAction;
	let removeWrestlerAction;
	let setDqRatingAction;
	let setPageIndexAction;
	let setRefScoreAction;
	let unrecognizedAction;

	beforeEach(() => {
		roundsState = roundsReducer(undefined, {});
		state = reducer(undefined, {});
		addWrestlerAction = {
			type: ADD_WRESTLER_TO_MATCH,
			wrestlerId: 2,
		};
		removeWrestlerAction = {
			type: REMOVE_WRESTLER_FROM_MATCH,
			wrestlerId: 2,
		};
		setDqRatingAction = {
			type: SET_DQ_RATING,
			dqRating: 6,
		};
		setPageIndexAction = {
			type: SET_PAGE_INDEX,
			pageIndex: 5,
		};
		setRefScoreAction = {
			type: SET_REF_SCORE,
			refScore: 8,
		};
    unrecognizedAction = { type: 'unrecognized action' };
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			test('adds the provided id to the `wrestlers` array in state.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				state = reducer(state, addWrestlerAction);
				roundsState = roundsReducer(roundsState, addWrestlerAction);
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [2],
				});
			});
		});

		describe(`"${REMOVE_WRESTLER_FROM_MATCH}" action`, () => {
			test('removes the provided id from the `wrestlers` array in state.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				state = reducer(state, addWrestlerAction);
				roundsState = roundsReducer(roundsState, addWrestlerAction);
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [2],
				});
				state = reducer(state, removeWrestlerAction);
				roundsState = roundsReducer(roundsState, removeWrestlerAction);
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_DQ_RATING}" action`, () => {
			test('sets `dqRating` in state to the value of `dqRating` from the action.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				expect(reducer(state, setDqRatingAction)).toEqual({
					dqRating: 6,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsReducer(roundsState),
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_PAGE_INDEX}" action`, () => {
			test('sets `pageIndex` in state to the value of `pageIndex` from the action.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				expect(reducer(state, setPageIndexAction)).toEqual({
					dqRating: 5,
					pageIndex: 5,
					refScore: 5,
					rounds: roundsReducer(roundsState),
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_REF_SCORE}" action`, () => {
			test('sets `refScore` in state to the value of `refScore` from the action.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				expect(reducer(state, setRefScoreAction)).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 8,
					rounds: roundsReducer(roundsState),
					wrestlers: [],
				});
			});
		});

		describe('unrecognized action', () => {
			test('returns the current state.', () => {
				expect(state).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [],
				});
				expect(reducer(state, unrecognizedAction)).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsReducer(roundsState),
					wrestlers: [],
				});
			});
		});
	});

	describe('selectors', () => {
		describe('get', () => {
			test('returns the appropriate state.', () => {
				state = reducer(state, addWrestlerAction);
				roundsState = roundsReducer(roundsState, addWrestlerAction);
				expect(selectors.get(state)).toEqual({
					dqRating: 5,
					pageIndex: 0,
					refScore: 5,
					rounds: roundsState,
					wrestlers: [2],
				});
			});
		});

		describe('getMaxRounds', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getMaxRounds(state))
					.toEqual(roundsSelectors.getMaxRounds(state.rounds));
			});
		});

		describe('getStrategies', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getStrategies(state))
					.toEqual(roundsSelectors.getStrategies(state.rounds));
			});
		});

		describe('getStrategyByWrestlerId', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getStrategyByWrestlerId(state))
					.toEqual(roundsSelectors.getStrategyByWrestlerId(state.rounds));
			});
		});
	});
});
