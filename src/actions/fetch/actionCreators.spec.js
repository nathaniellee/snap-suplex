import actionCreators from './actionCreators';
import actionTypes from './actionTypes';

describe('fetch action creators', () => {
	describe('fetchMovesRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.FETCH_MOVES_REQUEST };
			expect(actionCreators.fetchMovesRequest()).toEqual(expectedAction);
		});
	});

	describe('fetchMovesSuccess', () => {
		test('creates the expected action.', () => {
			const moves = [
				{ id: 1 },
				{ id: 2 },
			];
			const expectedAction = {
				type: actionTypes.FETCH_MOVES_SUCCESS,
				moves,
			};
			expect(actionCreators.fetchMovesSuccess(moves)).toEqual(expectedAction);
		});
	});

	describe('fetchMovesFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.FETCH_MOVES_FAILURE,
				error,
			};
			expect(actionCreators.fetchMovesFailure(error)).toEqual(expectedAction);
		});
	});

	describe('fetchStrategiesRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.FETCH_STRATEGIES_REQUEST };
			expect(actionCreators.fetchStrategiesRequest()).toEqual(expectedAction);
		});
	});

	describe('fetchStrategiesSuccess', () => {
		test('creates the expected action.', () => {
			const strategies = [
				{ id: 1 },
				{ id: 2 },
			];
			const expectedAction = {
				type: actionTypes.FETCH_STRATEGIES_SUCCESS,
				strategies,
			};
			expect(actionCreators.fetchStrategiesSuccess(strategies)).toEqual(expectedAction);
		});
	});

	describe('fetchStrategiesFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.FETCH_STRATEGIES_FAILURE,
				error,
			};
			expect(actionCreators.fetchStrategiesFailure(error)).toEqual(expectedAction);
		});
	});

	describe('fetchWrestlersRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.FETCH_WRESTLERS_REQUEST };
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
