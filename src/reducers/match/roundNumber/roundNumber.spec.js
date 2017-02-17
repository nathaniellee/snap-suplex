import actionTypes from '../../../actions/actionTypes';
import reducer from './roundNumber';

describe('match.roundNumber reducer', () => {
	const {
		DECREMENT_ROUND_NUMBER,
		INCREMENT_ROUND_NUMBER,
		START_MATCH,
	} = actionTypes;
	const decrementAction = { type: DECREMENT_ROUND_NUMBER };
	const incrementAction = { type: INCREMENT_ROUND_NUMBER };
	const startMatchAction = { type: START_MATCH };
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('returns initial state of 1.', () => {
		expect(initialState).toBe(1);
	});

	test(`returns current state + 1 when it receives an "${INCREMENT_ROUND_NUMBER}" action.`, () => {
		const updatedState = reducer(initialState, incrementAction);

		expect(updatedState).toBe(initialState + 1);
		expect(reducer(updatedState, incrementAction)).toBe(updatedState + 1);
	});

	test(`returns current state - 1 when it receives a "${DECREMENT_ROUND_NUMBER}" action.`, () => {
		const updatedState = reducer(initialState, decrementAction);

		expect(updatedState).toBe(initialState - 1);
		expect(reducer(updatedState, decrementAction)).toBe(updatedState - 1);
	});

	test(`returns 1 when it receives a "${START_MATCH}" action.`, () => {
		const incrementedState = reducer(initialState, incrementAction);
		expect(reducer(incrementedState, startMatchAction)).toBe(1);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const incrementedState = reducer(initialState, incrementAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(incrementedState, unrecognizedAction)).toBe(incrementedState);
	});
});
