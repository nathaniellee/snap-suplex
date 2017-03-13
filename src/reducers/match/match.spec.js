import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './match';

const {
	START_MATCH,
} = actionTypes;

describe('match', () => {
	let state;
	let startMatchAction;
	let unrecognizedAction;

	beforeEach(() => {
		state = reducer(undefined, {});
		startMatchAction = { type: START_MATCH };
    unrecognizedAction = { type: 'unrecognized action' };
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual({
					isMatchUnderway: false,
				});
			});
		});

		describe(`"${START_MATCH}" action`, () => {
			test('sets `isMatchUnderway` in state to true.', () => {
				expect(state).toEqual({
					isMatchUnderway: false,
				});
				expect(reducer(state, startMatchAction)).toEqual({
					isMatchUnderway: true,
				});
			});
		});

		describe('unrecognized action', () => {
			test('returns the current state.', () => {
				expect(state).toEqual({
					isMatchUnderway: false,
				});
				expect(reducer(state, unrecognizedAction)).toEqual({
					isMatchUnderway: false,
				});
			});
		});
	});

	describe('selectors', () => {
		describe('get', () => {
			test('returns the appropriate state.', () => {
				state = reducer(state, startMatchAction);
				expect(selectors.get(state)).toEqual({
					isMatchUnderway: true,
				});
			});
		});
	});
});
