import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import {
  defaultDqRating,
  defaultNumRounds,
  defaultRefScore,
  defaultStrategyId,
} from '../../constants/defaults';
import reducer, { selectors } from './matchSetup';

const {
	ADD_WRESTLER_TO_MATCH,
	REMOVE_WRESTLER_FROM_MATCH,
	SET_DQ_RATING,
	SET_NUM_ROUNDS,
	SET_PAGE_INDEX,
	SET_REF_SCORE,
} = actionTypes;

const defaultState = {
	dqRating: defaultDqRating,
	numRounds: defaultNumRounds,
	pageIndex: 0,
	refScore: defaultRefScore,
	strategies: {},
	wrestlers: [],
};

describe('matchSetup', () => {
	let action;
	let state;

	beforeEach(() => {
		state = reducer(undefined, {});
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual(defaultState);
			});
		});

		describe(`"${SET_DQ_RATING}" action`, () => {
			test('sets `dqRating` in state to the value of `dqRating` from the action.', () => {
				expect(state).toEqual(defaultState);
				action = {
					type: SET_DQ_RATING,
					dqRating: 8,
				};
				state = reducer(state, action);
				expect(state.dqRating).toEqual(8);
				expect(_.omit(state, 'dqRating')).toEqual(_.omit(defaultState, 'dqRating'));
			});
		});

		describe(`"${SET_NUM_ROUNDS}" action`, () => {
			describe('`strategies` in state is empty', () => {
				test('sets `numRounds` in state to the value of `numRounds` from the action.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: SET_NUM_ROUNDS,
						numRounds: 8,
					};
					state = reducer(state, action);
					expect(state.numRounds).toEqual(8);
					expect(_.omit(state, 'numRounds')).toEqual(_.omit(defaultState, 'numRounds'));
				});
			});
		});

		describe(`"${SET_PAGE_INDEX}" action`, () => {
			test('sets `pageIndex` in state to the value of `pageIndex` from the action.', () => {
				expect(state).toEqual(defaultState);
				action = {
					type: SET_PAGE_INDEX,
					pageIndex: 3,
				};
				state = reducer(state, action);
				expect(state.pageIndex).toEqual(3);
				expect(_.omit(state, 'pageIndex')).toEqual(_.omit(defaultState, 'pageIndex'));
			});
		});

		describe(`"${SET_REF_SCORE}" action`, () => {
			test('sets `refScore` in state to the value of `refScore` from the action.', () => {
				expect(state).toEqual(defaultState);
				action = {
					type: SET_REF_SCORE,
					refScore: 6,
				};
				state = reducer(state, action);
				expect(state.refScore).toEqual(6);
				expect(_.omit(state, 'refScore')).toEqual(_.omit(defaultState, 'refScore'));
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			beforeEach(() => {
				action = {
					type: ADD_WRESTLER_TO_MATCH,
					wrestlerId: 16,
				};
			});

			test('adds `wrestlerId` to the `wrestlers` array in state.', () => {
				expect(state).toEqual(defaultState);
				state = reducer(state, action);
				expect(_.includes(state.wrestlers, 16)).toBeTruthy();
				expect(_.omit(state, ['strategies', 'wrestlers']))
					.toEqual(_.omit(defaultState, ['strategies', 'wrestlers']));
			});

			test('adds default strategies for `wrestlerId` to the `strategies` map in state.', () => {
				expect(state).toEqual(defaultState);

				state = reducer(state, action);
				expect(_.has(state.strategies, '16')).toBeTruthy();

				_.forEach(state.strategies['16'], (strategyId) => {
					expect(strategyId).toEqual(defaultStrategyId);
				});

				expect(_.omit(state, ['strategies', 'wrestlers']))
					.toEqual(_.omit(defaultState, ['strategies', 'wrestlers']));
			});
		});

		describe(`"${REMOVE_WRESTLER_FROM_MATCH}" action`, () => {
			let addWrestlerAction;
			let removeWrestlerAction;

			beforeEach(() => {
				addWrestlerAction = {
					type: ADD_WRESTLER_TO_MATCH,
					wrestlerId: 25,
				};
				removeWrestlerAction = {
					type: REMOVE_WRESTLER_FROM_MATCH,
					wrestlerId: 25,
				};
			});

			test('removes `wrestlerId` from the `wrestlers` array in state.', () => {
				expect(state).toEqual(defaultState);

				state = reducer(state, addWrestlerAction);
				expect(_.includes(state.wrestlers, 25)).toBeTruthy();

				state = reducer(state, removeWrestlerAction);
				expect(_.includes(state.wrestlers, 25)).toBeFalsy();

				expect(_.omit(state, ['strategies', 'wrestlers']))
					.toEqual(_.omit(defaultState, ['strategies', 'wrestlers']));
			});

			test('removes `wrestlerId` from the `strategies` map in state.', () => {
				expect(state).toEqual(defaultState);
				
				state = reducer(state, addWrestlerAction);
				expect(_.has(state.strategies, '25')).toBeTruthy();

				_.forEach(state.strategies['25'], (strategyId) => {
					expect(strategyId).toEqual(defaultStrategyId);
				});

				state = reducer(state, removeWrestlerAction);
				expect(_.has(state.strategies, '25')).toBeFalsy();

				expect(_.omit(state, ['strategies', 'wrestlers']))
					.toEqual(_.omit(defaultState, ['strategies', 'wrestlers']));
			});
		});
	});

	describe('selectors', () => {
		let selected;

		describe('get', () => {
			test('returns the appropriate state.', () => {
				action = {
					type: SET_REF_SCORE,
					refScore: 1,
				};
				state = reducer(state, action);
				selected = selectors.get(state);
				expect(selected.refScore).toEqual(1);
				expect(_.omit(selected, 'refScore')).toEqual(_.omit(defaultState, 'refScore'));
			});
		});
	});
});
