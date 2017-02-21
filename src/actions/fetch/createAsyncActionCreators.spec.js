import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from './actionTypes';
import createAsyncActionCreators from './createAsyncActionCreators';

describe('create fetch action creators', () => {
	let store;

	beforeEach(() => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		store = mockStore({});
	});

	describe('fetchWrestlers', () => {
		const getMockApi = (response) => ({
			wrestlers: {
				get: () => response,
			},
		});

		test('creates the expected request action.', () => {
			const api = getMockApi(Promise.resolve());

			return store.dispatch(createAsyncActionCreators(api).fetchWrestlers()).then(() => {
				const actions = store.getActions();
				expect(actions[0]).toEqual({ type: actionTypes.FETCH_WRESTLERS_REQUEST });
			});
		});

		test('creates the expected success action upon success.', () => {
			const wrestlers = [
				{ id: 1 },
				{ id: 2 },
			];
			const api = getMockApi(Promise.resolve(wrestlers));

			return store.dispatch(createAsyncActionCreators(api).fetchWrestlers()).then(() => {
				const actions = store.getActions();
				expect(actions[1]).toEqual({
					type: actionTypes.FETCH_WRESTLERS_SUCCESS,
					wrestlers,
				});
			});
		});

		test('creates the expected failure action upon failure.', () => {
			const wrestlers = [
				{ id: 1 },
				{ id: 2 },
			];
			const api = getMockApi(Promise.reject('boo'));

			return store.dispatch(createAsyncActionCreators(api).fetchWrestlers()).then(() => {
				const actions = store.getActions();
				expect(actions[1]).toEqual({
					type: actionTypes.FETCH_WRESTLERS_FAILURE,
					error: 'boo',
				});
			});
		});
	});
});
