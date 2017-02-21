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
				type: actionCreators.ADD_WRESTLER_TO_MATCH,
				wrestler,
			};

			expect(actionCreators.addWrestler(wrestler)).toEqual(expectedAction);
		});
	});

	describe('decrementRoundNumber', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.DECREMENT_ROUND_NUMBER };
			expect(actionCreators.decrementRoundNumber()).toEqual(expectedAction);
		});
	});

	describe('incrementRoundNumber', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.INCREMENT_ROUND_NUMBER };
			expect(actionCreators.incrementRoundNumber()).toEqual(expectedAction);
		});
	});

	describe('setMaxRounds', () => {
		test('creates the expected action.', () => {
			const expectedAction = {
				type: actionTypes.INCREMENT_ROUND_NUMBER,
				maxRounds: 8,
			};
			expect(actionCreators.setMaxRounds(8)).toEqual(expectedAction);
		});
	});

	describe('startMatch', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.START_MATCH };
			expect(actionCreators.startMatch()).toEqual(expectedAction);
		});
	});
});