import actionTypes from '../../../actions/actionTypes';
import reducer, * as selectors from './wrestlers';

describe('match.wrestlers reducer', () => {
	const { ADD_WRESTLER_TO_MATCH } = actionTypes;
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('returns initial state of [].', () => {
		expect(initialState).toEqual([]);
	});

	test(`returns current state with "wrestler" from an "${ADD_WRESTLER_TO_MATCH}" action appended if its "id" is not already found in state.`, () => {
		const action = {
			type: ADD_WRESTLER_TO_MATCH,
			wrestler: { id: 2 },
		};
		expect(reducer(initialState, action)).toEqual([
			{ id: 2 },
		]);
	});

	test(`returns current state if "wrestler" from an "${ADD_WRESTLER_TO_MATCH}" action has "id" that is already found in state.`, () => {
		const addWrestlerAction = {
			type: ADD_WRESTLER_TO_MATCH,
			wrestler: { id: 3 },
		};
		const addedState = reducer(initialState, addWrestlerAction);

		expect(reducer(addedState, addWrestlerAction)).toEqual(addedState);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const addWrestlerAction = {
			type: ADD_WRESTLER_TO_MATCH,
			wrestler: { id: 5 },
		};
		const updatedState = reducer(initialState, addWrestlerAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(updatedState, unrecognizedAction)).toBe(updatedState);
	});
});

describe('match.wrestlers selectors', () => {
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	describe('get', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.get(initialState)).toBe(initialState);
		});
	});
});
