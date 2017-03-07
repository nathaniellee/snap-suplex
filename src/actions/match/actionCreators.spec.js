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
				type: actionTypes.ADD_WRESTLER_TO_MATCH,
				wrestler,
			};

			expect(actionCreators.addWrestler(wrestler)).toEqual(expectedAction);
		});
	});

	describe('incrementRoundNumber', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.INCREMENT_ROUND_NUMBER };
			expect(actionCreators.incrementRoundNumber()).toEqual(expectedAction);
		});
	});

	describe('setDqRating', () => {
		test('creates the expected action.', () => {
			const expectedAction = {
				type: actionTypes.SET_DQ_RATING,
				dqRating: 8,
			};
			expect(actionCreators.setDqRating(8)).toEqual(expectedAction);
		});
	});

	describe('setMaxRounds', () => {
		test('creates the expected action.', () => {
			const expectedAction = {
				type: actionTypes.SET_MAX_ROUNDS,
				maxRounds: 8,
			};
			expect(actionCreators.setMaxRounds(8)).toEqual(expectedAction);
		});
	});

	describe('setRefScore', () => {
		test('creates the expected action.', () => {
			const expectedAction = {
				type: actionTypes.SET_REF_SCORE,
				refScore: 8,
			};
			expect(actionCreators.setRefScore(8)).toEqual(expectedAction);
		});
	});

	describe('startMatch', () => {
		test('creates the expected action.', () => {
			const expectedAction = { type: actionTypes.START_MATCH };
			expect(actionCreators.startMatch()).toEqual(expectedAction);
		});
	});
});
