import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import maxRounds, * as fromMaxRounds from './maxRounds/maxRounds';
import roundNumber, * as fromRoundNumber from './roundNumber/roundNumber';
import wrestlers, * as fromWrestlers from './wrestlers/wrestlers';
import reducer, * as selectors from './match';

describe('match reducer', () => {
	const {
		ADD_WRESTLER_TO_MATCH,
		SET_MAX_ROUNDS,
		START_MATCH,
	} = actionTypes;
	let action;
	let initialState;
	let updatedState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('combines the appropriate reducers.', () => {
		expect(_.xor([
			'maxRounds',
			'roundNumber',
			'wrestlers',
		], _.keys(initialState))).toHaveLength(0);

		// Compare results from an action that the `maxRounds` reducer handles.
		action = {
			type: SET_MAX_ROUNDS,
			maxRounds: 10,
		};
		updatedState = reducer(initialState, action);
		expect(updatedState.maxRounds).toEqual(maxRounds(initialState.maxRounds, action));

		// Compare results from an action that the `roundNumber` reducer handles.
		action = { type: START_MATCH };
		updatedState = reducer(updatedState, action);
		expect(updatedState.roundNumber).toEqual(roundNumber(updatedState.roundNumber, action));

		// Compare results from an action that the `wrestlers` reducer handles.
		action = {
			type: ADD_WRESTLER_TO_MATCH,
			wrestler: { id: 2 },
		};
		updatedState = reducer(updatedState, action);
		expect(updatedState.wrestlers).toEqual(wrestlers(updatedState.wrestlers, action));
	});
});

describe('match selectors', () => {
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	describe('get', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.get(initialState)).toEqual(initialState);
		});
	});

	describe('getMaxRounds', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.getMaxRounds(initialState)).toEqual(fromMaxRounds.get(initialState.maxRounds));
		});
	});

	describe('getRoundNumber', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.getRoundNumber(initialState)).toEqual(fromRoundNumber.get(initialState.roundNumber));
		});
	});

	describe('getWrestlers', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.getWrestlers(initialState)).toEqual(fromWrestlers.get(initialState.wrestlers));
		});
	});
});
