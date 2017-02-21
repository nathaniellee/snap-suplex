import actionCreators from './actionCreators';
import actionTypes from './actionTypes';

describe('match action creators', () => {
	describe('addWrestler', () => {
		test('creates the expected action.', () => {
			const wrestler = {
				id: 1,
				name: 'Ravishing Rick Rude',
			};
			const expectedAction = {
				type: actionCreators.ADD_WRESTLER,
				wrestler,
			};

			expect(actionCreators.addWrestler(wrestler)).toEqual(expectedAction);
		});
	});

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
				type: actionCreators.SET_WRESTLERS,
				wrestlers,
			};

			expect(actionCreators.setWrestlers(wrestlers)).toEqual(expectedAction);
		});
	});
});