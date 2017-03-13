import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import {
	defaultMaxRounds,
	getDefaultStrategies,
} from '../../../constants/defaults';
import reducer, { selectors } from './rounds';

const {
	ADD_WRESTLER_TO_MATCH,
	REMOVE_WRESTLER_FROM_MATCH,
	SET_MAX_ROUNDS,
	SET_STRATEGIES,
} = actionTypes;

describe('rounds', () => {
	const addWrestlerToMatchAction = { type: ADD_WRESTLER_TO_MATCH };
	const setMaxRoundsAction = { type: SET_MAX_ROUNDS };
	const setStrategiesAction = { type: SET_STRATEGIES };
	const removeWrestlerFromMatchAction = { type: REMOVE_WRESTLER_FROM_MATCH };
	const unrecognizedAction = { type: 'unrecognized action' };
	let state;
	let selection;

	beforeEach(() => {
		state = reducer(undefined, {});
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual({
					maxRounds: defaultMaxRounds,
					strategies: {},
				});
			});
		});

		describe(`"${SET_MAX_ROUNDS}" action`, () => {
			test('sets `maxRounds` in state to the value of `maxRounds` from the action.', () => {
				expect(state).toEqual({
					maxRounds: defaultMaxRounds,
					strategies: {},
				});
				expect(reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 50,
				})).toEqual({
					maxRounds: 50,
					strategies: {},
				});
			});
		});

		describe(`"${SET_STRATEGIES}" action`, () => {
			test('sets `strategies` in state using the value of `strategies` from the action.', () => {
				const updatedStrategies = {
					1: [],
					2: [],
				};

				expect(state).toEqual({
					maxRounds: defaultMaxRounds,
					strategies: {},
				});
				expect(reducer(state, {
					...setStrategiesAction,
					strategies: updatedStrategies,
				})).toEqual({
					maxRounds: defaultMaxRounds,
					strategies: updatedStrategies,
				});
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			test('adds the wrestler ID to `strategies` in state.', () => {
				const wrestlerId = 8;

				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 5,
				});
				state = reducer(state, {
					...addWrestlerToMatchAction,
					wrestlerId,
				});
				expect(state.strategies[wrestlerId]).toBeDefined();
				expect(state.strategies[wrestlerId]).toEqual(getDefaultStrategies(5));
			});
		});

		describe(`"${REMOVE_WRESTLER_FROM_MATCH}" action`, () => {
			test('removes the wrestler ID from `strategies` in state.', () => {
				const wrestlerId = 8;

				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 5,
				});
				state = reducer(state, {
					...addWrestlerToMatchAction,
					wrestlerId,
				});
				expect(state.strategies[wrestlerId]).toBeDefined();
				expect(state.strategies[wrestlerId]).toEqual(getDefaultStrategies(5));
				state = reducer(state, {
					...removeWrestlerFromMatchAction,
					wrestlerId,
				});
				expect(state.strategies[wrestlerId]).toBeUndefined();
			});
		});

		describe('unrecognized action', () => {
			test('returns the current state.', () => {
				expect(state).toEqual({
					maxRounds: defaultMaxRounds,
					strategies: {},
				});
				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 5,
				});
				expect(state).toEqual({
					maxRounds: 5,
					strategies: {},
				});
				state = reducer(state, unrecognizedAction);
				expect(state).toEqual({
					maxRounds: 5,
					strategies: {},
				});
			});
		});
	});

	describe('selectors', () => {
		describe('get', () => {
			test('returns the appropriate state.', () => {
				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 20,
				});
				expect(selectors.get(state)).toEqual({
					maxRounds: 20,
					strategies: {},
				});
			});
		});

		describe('getMaxRounds', () => {
			test('returns the appropriate state.', () => {
				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 15,
				});
				expect(selectors.getMaxRounds(state)).toEqual(15);
			});
		});

		describe('getStrategies', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getStrategies(state)).toEqual({});
			});

			test(`returns the appropriate state after a "${SET_MAX_ROUNDS}" action.`, () => {
				state = reducer(state, {
					...setMaxRoundsAction,
					maxRounds: 20,
				});
				expect(selectors.getStrategies(state)).toEqual({});
			});

			test(`returns the appropriate state after an "${ADD_WRESTLER_TO_MATCH}" action.`, () => {
				const wrestlerId = 11;

				state = reducer(state, {
					...addWrestlerToMatchAction,
					wrestlerId,
				});
				selection = selectors.getStrategies(state);

				expect(selection[wrestlerId]).toBeDefined();
				expect(selection[wrestlerId]).toEqual(getDefaultStrategies(defaultMaxRounds));
			});
		});

		describe('getStrategyByWrestlerId', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getStrategyByWrestlerId(state)).toEqual(null);
				expect(selectors.getStrategyByWrestlerId(state, 1)).toEqual(null);
			});

			test(`returns the appropriate state after an "${ADD_WRESTLER_TO_MATCH}" action.`, () => {
				const wrestlerId = 11;

				state = reducer(state, {
					...addWrestlerToMatchAction,
					wrestlerId,
				});
				selection = selectors.getStrategyByWrestlerId(state, wrestlerId);

				expect(selection).toBeDefined();
				expect(selection).toEqual(getDefaultStrategies(defaultMaxRounds));
			});
		});
	});
});
