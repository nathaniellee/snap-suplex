import actionCreators from './actionCreators';
import actionTypes from './actionTypes';

describe('fetch action creators', () => {
	describe('fetchWrestlersRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.FETCH_WRESTLERS_SUCCESS };
			expect(actionCreators.fetchWrestlersRequest()).toEqual(expectedAction);
		});
	});

	describe('fetchWrestlersSuccess', () => {
		test('creates the expected action.', () => {
			const wrestlers = [
				{ id: 1 },
				{ id: 2 },
			];
			const expectedAction = {
				type: actionTypes.FETCH_WRESTLERS_SUCCESS,
				wrestlers,
			};
			expect(actionCreators.fetchWrestlersSuccess(wrestlers)).toEqual(expectedAction);
		});
	});

	describe('fetchWrestlersFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.FETCH_WRESTLERS_FAILURE,
				error,
			};
			expect(actionCreators.fetchWrestlersFailure(error)).toEqual(expectedAction);
		});
	});
});
