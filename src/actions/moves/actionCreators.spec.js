import actionCreators from './actionCreators';
import actionTypes from './actionTypes';

describe('moves action creators', () => {
	describe('addMove', () => {
		test('creates the expected action.', () => {
			const move = {
				id: 1,
				name: 'Rude Awakening',
			};
			const expectedAction = {
				type: actionTypes.ADD_MOVE,
				move,
			};

			expect(actionCreators.addMove(move)).toEqual(expectedAction);
		});
	});

	describe('updateMove', () => {
		test('creates the expected action.', () => {
			const move = {
				id: 1,
				name: 'Rude Awakening',
			};
			const expectedAction = {
				type: actionTypes.UPDATE_MOVE,
				move,
			};

			expect(actionCreators.updateMove(move)).toEqual(expectedAction);
		});
	});
});
