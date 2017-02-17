import actionTypes from '../../../actions/actionTypes';
import reducer from './roundNumber';

describe('match.roundNumber reducer', () => {
	const {
		INCREMENT_ROUND_NUMBER,
		DECREMENT_ROUND_NUMBER,
		START_MATCH,
	} = actionTypes;
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('returns initial state of 1.', () => {
		expect(initialState).toBe(1);
	});

	test(`returns current state + 1 when it receives an "${INCREMENT_ROUND_NUMBER}" action.`, () => {
		const action = { type: INCREMENT_ROUND_NUMBER };
		const updatedState = reducer(initialState, action);

		expect(updatedState).toBe(initialState + 1);
		expect(reducer(updatedState, action)).toBe(updatedState + 1);
	});

	test(`returns current state - 1 when it receives a "${DECREMENT_ROUND_NUMBER}" action.`, () => {
		const action = { type: DECREMENT_ROUND_NUMBER };
		const updatedState = reducer(initialState, action);

		expect(updatedState).toBe(initialState - 1);
		expect(reducer(updatedState, action)).toBe(updatedState - 1);
	});

	test(`returns 1 when it receives a "${START_MATCH}" action.`, () => {
		const incrementAction = { type: INCREMENT_ROUND_NUMBER };
		const incrementedState = reducer(initialState, incrementAction);
		const startMatchAction = { type: START_MATCH };

		expect(reducer(incrementedState, startMatchAction)).toBe(1);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const incrementAction = { type: INCREMENT_ROUND_NUMBER };
		const incrementedState = reducer(initialState, incrementAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(incrementedState, unrecognizedAction)).toBe(incrementedState);
	});
});
