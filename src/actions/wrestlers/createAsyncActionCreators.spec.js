import _ from 'lodash';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockWrestlers from '../../test/mocks/wrestlers';
import actionTypes from './actionTypes';
import createAsyncActionCreators from './createAsyncActionCreators';

describe('create wrestler action creators', () => {
	let store;

	beforeEach(() => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		store = mockStore({});
	});

	describe('addWrestler', () => {
		const wrestler = _.head(mockWrestlers);

		test('creates the expected request actions.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
			};
			const { addWrestler } = createAsyncActionCreators(api);

			return store.dispatch(addWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const postMoveRequestActions = _.filter(actions, (action) => {
					return action.type === actionTypes.POST_MOVE_REQUEST;
				});

				expect(_.size(postMoveRequestActions)).toEqual(moveCount);
				expect(_.find(actions, { type: actionTypes.POST_WRESTLER_REQUEST }))
					.toBeDefined();
			});
		});

		test('creates the expected success action upon move post success.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
			};
			const { addWrestler } = createAsyncActionCreators(api);

			return store.dispatch(addWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const postMoveRequestActions = _.filter(actions, (action) => {
					return action.type === actionTypes.POST_MOVE_SUCCESS;
				});

				expect(_.size(postMoveRequestActions)).toEqual(moveCount);
			});
		});

		test('creates the expected failure action upon move post failure.', () => {
			const api = {
				moves: {
					post: () => Promise.reject('boo'),
				},
			};
			const { addWrestler } = createAsyncActionCreators(api);

			return store.dispatch(addWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const postMoveFailureActions = _.filter(actions, (action) => {
					return action.type === actionTypes.POST_MOVE_FAILURE;
				});

				expect(_.size(postMoveFailureActions)).toEqual(moveCount);
			});
		});

		test('creates the expected failure action upon wrestler post failure.', () => {
			const api = {
				moves: {
					post: () => Promise.resolve(),
				},
				wrestlers: {
					post: () => Promise.reject('boo'),
				},
			};
			const { addWrestler } = createAsyncActionCreators(api);

			return store.dispatch(addWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const postWrestlerFailureAction = _.find(actions, {
					type: actionTypes.POST_WRESTLER_FAILURE,
				});

				expect(postWrestlerFailureAction).toBeDefined();
			});
		});

		test('creates the expected success action upon wrestler post success.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					post: () => Promise.resolve(),
				},
			};
			const { addWrestler } = createAsyncActionCreators(api);

			return store.dispatch(addWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const postWrestlerSuccessAction = _.find(actions, {
					type: actionTypes.POST_WRESTLER_SUCCESS,
				});

				expect(postWrestlerSuccessAction).toBeDefined();
			});
		});
	});

	describe('updateWrestler', () => {
		const wrestler = _.head(mockWrestlers);

		test('creates the expected request actions.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
			};
			const { updateWrestler } = createAsyncActionCreators(api);

			return store.dispatch(updateWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const putMoveRequestActions = _.filter(actions, (action) => {
					return action.type === actionTypes.PUT_MOVE_REQUEST;
				});

				expect(_.size(putMoveRequestActions)).toEqual(moveCount);
				expect(_.find(actions, { type: actionTypes.PUT_WRESTLER_REQUEST }))
					.toBeDefined();
			});
		});

		test('creates the expected success action upon move put success.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
			};
			const { updateWrestler } = createAsyncActionCreators(api);

			return store.dispatch(updateWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const putMoveRequestActions = _.filter(actions, (action) => {
					return action.type === actionTypes.PUT_MOVE_SUCCESS;
				});

				expect(_.size(putMoveRequestActions)).toEqual(moveCount);
			});
		});

		test('creates the expected failure action upon move put failure.', () => {
			const api = {
				moves: {
					put: () => Promise.reject('boo'),
				},
			};
			const { updateWrestler } = createAsyncActionCreators(api);

			return store.dispatch(updateWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const moveCount = _.sum([
					_.size(wrestler.moves.str),
					_.size(wrestler.moves.bra),
					_.size(wrestler.moves.dex),
					_.size(wrestler.moves.tec),
					_.size(wrestler.moves.fin),
				]);
				const putMoveFailureActions = _.filter(actions, (action) => {
					return action.type === actionTypes.PUT_MOVE_FAILURE;
				});

				expect(_.size(putMoveFailureActions)).toEqual(moveCount);
			});
		});

		test('creates the expected failure action upon wrestler put failure.', () => {
			const api = {
				moves: {
					put: () => Promise.resolve(),
				},
				wrestlers: {
					put: () => Promise.reject('boo'),
				},
			};
			const { updateWrestler } = createAsyncActionCreators(api);

			return store.dispatch(updateWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const putWrestlerFailureAction = _.find(actions, {
					type: actionTypes.PUT_WRESTLER_FAILURE,
				});

				expect(putWrestlerFailureAction).toBeDefined();
			});
		});

		test('creates the expected success action upon wrestler put success.', () => {
			const api = {
				moves: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
				wrestlers: {
					get: () => Promise.resolve(),
					put: () => Promise.resolve(),
				},
			};
			const { updateWrestler } = createAsyncActionCreators(api);

			return store.dispatch(updateWrestler(wrestler)).then(() => {
				const actions = store.getActions();
				const putWrestlerSuccessAction = _.find(actions, {
					type: actionTypes.PUT_WRESTLER_SUCCESS,
				});

				expect(putWrestlerSuccessAction).toBeDefined();
			});
		});
	});
});
