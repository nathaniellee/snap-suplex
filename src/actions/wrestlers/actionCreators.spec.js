import actionCreators from './actionCreators';
import actionTypes from './actionTypes';

describe('wrestlers action creators', () => {
	describe('setWrestlers', () => {
		test('creates the expected action.', () => {
			const wrestlers = [
				{
					id: 1,
					name: 'Ravishing Rick Rude',
				},
				{
					id: 2,
					name: 'Mr. Perfect',
				}
			];
			const expectedAction = {
				type: actionTypes.SET_WRESTLERS,
				wrestlers,
			};

			expect(actionCreators.setWrestlers(wrestlers)).toEqual(expectedAction);
		});
	});

	describe('postMoveRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.POST_MOVE_REQUEST };
			expect(actionCreators.postMoveRequest()).toEqual(expectedAction);
		});
	});

	describe('postMoveSuccess', () => {
		test('creates the expected action.', () => {
			const move = {
				id: 1,
				description: 'Rude Awakening',
			};
			const expectedAction = {
				type: actionTypes.POST_MOVE_SUCCESS,
				move,
			};
			expect(actionCreators.postMoveSuccess(move)).toEqual(expectedAction);
		});
	});

	describe('postMoveFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.POST_MOVE_FAILURE,
				error,
			};
			expect(actionCreators.postMoveFailure(error)).toEqual(expectedAction);
		});
	});

	describe('putMoveRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.PUT_MOVE_REQUEST };
			expect(actionCreators.putMoveRequest()).toEqual(expectedAction);
		});
	});

	describe('putMoveSuccess', () => {
		test('creates the expected action.', () => {
			const move = {
				id: 2,
				description: 'Perfect-plex',
			};
			const expectedAction = {
				type: actionTypes.PUT_MOVE_SUCCESS,
				move,
			};
			expect(actionCreators.putMoveSuccess(move)).toEqual(expectedAction);
		});
	});

	describe('putMoveFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.PUT_MOVE_FAILURE,
				error,
			};
			expect(actionCreators.putMoveFailure(error)).toEqual(expectedAction);
		});
	});

	describe('postWrestlerRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.POST_WRESTLER_REQUEST };
			expect(actionCreators.postWrestlerRequest()).toEqual(expectedAction);
		});
	});

	describe('postWrestlerSuccess', () => {
		test('creates the expected action.', () => {
			const wrestler = {
				id: 1,
				name: 'Ravishing Rick Rude',
			};
			const expectedAction = {
				type: actionTypes.POST_WRESTLER_SUCCESS,
				wrestler,
			};
			expect(actionCreators.postWrestlerSuccess(wrestler)).toEqual(expectedAction);
		});
	});

	describe('postWrestlerFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.POST_WRESTLER_FAILURE,
				error,
			};
			expect(actionCreators.postWrestlerFailure(error)).toEqual(expectedAction);
		});
	});

	describe('putWrestlerRequest', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.PUT_WRESTLER_REQUEST };
			expect(actionCreators.putWrestlerRequest()).toEqual(expectedAction);
		});
	});

	describe('putWrestlerSuccess', () => {
		test('creates the expected action.', () => {
			const wrestler = {
				id: 2,
				name: 'Mr. Perfect',
			};
			const expectedAction = {
				type: actionTypes.PUT_WRESTLER_SUCCESS,
				wrestler,
			};
			expect(actionCreators.putWrestlerSuccess(wrestler)).toEqual(expectedAction);
		});
	});

	describe('putWrestlerFailure', () => {
		test('creates the expected action.', () => {
			const error = new Error();
			const expectedAction = {
				type: actionTypes.PUT_WRESTLER_FAILURE,
				error,
			};
			expect(actionCreators.putWrestlerFailure(error)).toEqual(expectedAction);
		});
	});
});
