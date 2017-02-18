import actionTypes from '../../../actions/actionTypes';
import reducer from './maxRounds';

describe('match/maxRounds reducer', () => {
	const { SET_MAX_ROUNDS } = actionTypes;
	const setMaxRoundsAction = {
		type: SET_MAX_ROUNDS,
		maxRounds: 10,
	};
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('returns initial state of 1.', () => {
		expect(initialState).toBe(1);
	});

	test(`returns "maxRounds" from a "${SET_MAX_ROUNDS}" action.`, () => {
		expect(reducer(initialState, setMaxRoundsAction)).toBe(setMaxRoundsAction.maxRounds);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const updatedState = reducer(initialState, setMaxRoundsAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(updatedState, unrecognizedAction)).toBe(updatedState);
	});
});
