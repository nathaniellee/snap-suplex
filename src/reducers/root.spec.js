import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import match, * as fromMatch from './match/match';
import wrestlers, * as fromWrestlers from './wrestlers/wrestlers';
import reducer, * as selectors from './root';

describe('root reducer', () => {
	const {
		SET_MAX_ROUNDS,
		SET_WRESTLERS,
	} = actionTypes;
	let action;
	let initialState;
	let updatedState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('combines the appropriate reducers.', () => {
		expect(_.xor([
			'match',
			'wrestlers',
		], _.keys(initialState))).toHaveLength(0);

		// Compare results from an action that the `match` reducer handles.
		action = {
			type: SET_MAX_ROUNDS,
			maxRounds: 10,
		};
		updatedState = reducer(initialState, action);
		expect(updatedState.match).toEqual(match(initialState.match, action));

		// Compare results from an action that the `wrestlers` reducer handles.
		action = {
			type: SET_WRESTLERS,
			wrestlers: [
				{ id: 2 },
			],
		};
		updatedState = reducer(updatedState, action);
		expect(updatedState.wrestlers).toEqual(wrestlers(updatedState.wrestlers, action));
	});
});
