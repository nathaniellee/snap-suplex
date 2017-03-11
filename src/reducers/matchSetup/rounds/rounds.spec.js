import _ from 'lodash';
import actionTypes from '../../../actions/actionTypes';
import actionCreators from '../../../actions/match/actionCreators';
import {
	defaultMaxRounds,
	getDefaultStrategies,
} from '../../../constants/defaults';
import reducer, { selectors } from './rounds';

const { SET_MAX_ROUNDS } = actionTypes;

describe('rounds', () => {
	let state;
	let setMaxRoundsAction;
	let unrecognizedAction;

	beforeEach(() => {
		state = reducer(undefined, {});
		setMaxRoundsAction = {
			type: SET_MAX_ROUNDS,
			maxRounds: 20,
		};
    unrecognizedAction = { type: 'unrecognized action' };
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
				state = reducer(state, setMaxRoundsAction);
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
		});

		describe('getStrategyByWrestlerId', () => {
			test('returns the appropriate state.', () => {
				expect(selectors.getStrategyByWrestlerId(state)).toEqual(null);
				expect(selectors.getStrategyByWrestlerId(state, 1)).toEqual(null);
			});
		});
	});
});
