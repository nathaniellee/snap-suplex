import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import { defaultStrategy } from '../../constants/defaults';
import defaultState from '../../constants/initialMatchState';
import {
  getInitialHealth,
} from '../../utils/match';
import reducer, { selectors } from './matchSetup';

const {
	ADD_WRESTLER_TO_MATCH,
	REMOVE_WRESTLER_FROM_MATCH,
	SET_DQ_RATING,
	SET_NUM_ROUNDS,
	SET_PAGE_INDEX,
	SET_REF_SCORE,
	SET_WARNINGS,
	START_MATCH,
} = actionTypes;

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

				expect(state.dqRating).toBe(8);
				expect(_.omit(state, 'dqRating')).toEqual(_.omit(defaultState, 'dqRating'));
			});
		});

		describe(`"${SET_NUM_ROUNDS}" action`, () => {
			test('sets `numRounds` in state to the value of `numRounds` from the action.', () => {
				expect(state).toEqual(defaultState);
				action = {
					type: SET_NUM_ROUNDS,
					numRounds: 35,
				};
				state = reducer(state, action);

				expect(state.numRounds).toBe(35);
				expect(_.omit(state, 'numRounds')).toEqual(_.omit(defaultState, 'numRounds'));
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

				expect(state.pageIndex).toBe(3);
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

				expect(state.refScore).toBe(6);
				expect(_.omit(state, 'refScore')).toEqual(_.omit(defaultState, 'refScore'));
			});
		});

		describe(`"${SET_WARNINGS}" action`, () => {
			test('sets `warnings` in state to the value of `warnings` from the action.', () => {
				expect(state).toEqual(defaultState);
				action = {
					type: SET_WARNINGS,
					warnings: 8,
				};
				state = reducer(state, action);

				expect(state.warnings).toBe(8);
				expect(_.omit(state, 'warnings')).toEqual(_.omit(defaultState, 'warnings'));
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			describe('`wrestlers` map in state is empty', () => {
				test('adds wrestler to the `wrestlers` map.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 16 },
					};
					state = reducer(state, action);

					expect(_.has(state.wrestlers, 16)).toBeTruthy();
					expect(_.omit(state, 'wrestlers')).toEqual(_.omit(defaultState, 'wrestlers'));
				});
			});

			describe('`wrestlers` array in state contains one wrestler', () => {
				test('adds wrestler to the `wrestlers` array.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 31 },
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 32 },
					};
					state = reducer(state, action);

					expect(_.has(state.wrestlers, 32)).toBeTruthy();
					expect(_.omit(state, 'wrestlers')).toEqual(_.omit(defaultState, 'wrestlers'));
				});
			});

			describe('`wrestlers` array in state contains two wrestlers', () => {
				test('does not add wrestler to the `wrestlers` array.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 50 },
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 51 },
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 52 },
					};
					state = reducer(state, action);

					expect(_.has(state.wrestlers, 52)).toBeFalsy();
					expect(_.omit(state, 'wrestlers')).toEqual(_.omit(defaultState, 'wrestlers'));
				});
			});
		});

		describe(`"${REMOVE_WRESTLER_FROM_MATCH}" action`, () => {
			test('removes the appropriate wrestler from the `wrestlers` array in state.', () => {
				expect(state).toEqual(defaultState);

				action = {
					type: ADD_WRESTLER_TO_MATCH,
					wrestler: { id: 25 },
				};
				state = reducer(state, action);
				expect(_.has(state.wrestlers, 25)).toBeTruthy();

				action = {
					type: REMOVE_WRESTLER_FROM_MATCH,
					wrestlerId: 25,
				};
				state = reducer(state, action);
				expect(_.has(state.wrestlers, 25)).toBeFalsy();

				expect(_.omit(state, 'wrestlers'))
					.toEqual(_.omit(defaultState, 'wrestlers'));
			});
		});

		describe(`"${START_MATCH}" action`, () => {
			describe('`wrestlers` map in state is empty', () => {
				test('returns the current state.', () => {
					expect(state).toEqual(defaultState);
					action = { type: START_MATCH };
					state = reducer(state, action);
					expect(state).toEqual(defaultState);
				});
			});

			describe('`wrestlers` array in state contains one wrestler', () => {
				test('returns the current state.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: {
							id: 75,
							stats: {
								sta: 6,
							},
						},
					};
					state = reducer(state, action);

					let priorState = state;
					action = { type: START_MATCH };
					state = reducer(state, action);
					expect(state).toEqual(priorState);
				});
			});

			describe('`wrestlers` array in state contains two wrestlers', () => {
				test('sets `roundNumber` in state to 1.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: {
							id: 3,
							stats: {
								sta: 3,
							},
						},
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: {
							id: 13,
							stats: {
								sta: 5,
							},
						},
					};
					state = reducer(state, action);
					action = { type: START_MATCH };
					state = reducer(state, action);

					expect(state.roundNumber).toBe(1);
					expect(_.omit(state, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers'
					])).toEqual(_.omit(defaultState, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers'
					]));
				});

				test('determines initial health for each wrestler.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: {
							id: 101,
							stats: {
								sta: 3,
							},
						},
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: {
							id: 102,
							stats: {
								sta: 5,
							},
						},
					};
					state = reducer(state, action);
					action = { type: START_MATCH };
					state = reducer(state, action);

					expect(_.has(state.wrestlers, 101)).toBeTruthy();
					expect(_.has(state.wrestlers, 102)).toBeTruthy();
					expect(state.wrestlers[101].health).toBe(getInitialHealth(3));
					expect(state.wrestlers[102].health).toBe(getInitialHealth(5));

					expect(_.omit(state, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers',
					])).toEqual(_.omit(defaultState, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers',
					]));
				});

				test('adds default strategies for each wrestler.', () => {
					expect(state).toEqual(defaultState);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 88,
							stats: {
								sta: 2,
							},
						},
					};
					state = reducer(state, action);
					action = {
						type: ADD_WRESTLER_TO_MATCH,
						wrestler: { id: 96,
							stats: {
								sta: 3,
							},
						},
					};
					state = reducer(state, action);
					action = { type: START_MATCH };
					state = reducer(state, action);

					expect(_.has(state.strategies, 88)).toBeTruthy();
					expect(_.has(state.strategies, 96)).toBeTruthy();
					expect(state.strategies[88]).toEqual(defaultStrategy);
					expect(state.strategies[96]).toEqual(defaultStrategy);

					expect(_.omit(state, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers',
					])).toEqual(_.omit(defaultState, [
						'attackerId',
						'defenderId',
						'roundNumber',
						'strategies',
						'wrestlers',
					]));
				});
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
