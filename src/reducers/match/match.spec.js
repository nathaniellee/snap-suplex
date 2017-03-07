import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './match';

const {
	ADD_WRESTLER_TO_MATCH,
	INCREMENT_ROUND_NUMBER,
	SET_MAX_ROUNDS,
	SET_REF_SCORE,
	START_MATCH,
} = actionTypes;

describe('match', () => {
	let state;
	let addWrestlerAction;
	let incrementAction;
	let setMaxRoundsAction;
	let setRefScoreAction;
	let startMatchAction;
	let unrecognizedAction;

	beforeEach(() => {
		state = reducer(undefined, {});
		addWrestlerAction = {
			type: ADD_WRESTLER_TO_MATCH,
			id: 2,
		};
		incrementAction = { type: INCREMENT_ROUND_NUMBER };
		setMaxRoundsAction = {
			type: SET_MAX_ROUNDS,
			maxRounds: 20,
		};
		setRefScoreAction = {
			type: SET_REF_SCORE,
			refScore: 8,
		};
		startMatchAction = { type: START_MATCH };
    unrecognizedAction = { type: 'unrecognized action' };
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			test('adds the provided id to the `wrestlers` array in state.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, addWrestlerAction)).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [2],
				});
			});
		});

		describe(`"${INCREMENT_ROUND_NUMBER}" action`, () => {
			test('increments `roundNumber` in state by 1.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, incrementAction)).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 2,
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_MAX_ROUNDS}" action`, () => {
			test('sets `maxRounds` in state to the value of `maxRounds` from the action.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, setMaxRoundsAction)).toEqual({
					maxRounds: 20,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_REF_SCORE}" action`, () => {
			test('sets `refScore` in state to the value of `refScore` from the action.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, setRefScoreAction)).toEqual({
					maxRounds: 10,
					refScore: 8,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${START_MATCH}" action`, () => {
			test('sets `roundNumber` in state to 1.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				state = reducer(state, incrementAction);
				state = reducer(state, incrementAction);
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 3,
					wrestlers: [],
				});
				expect(reducer(state, startMatchAction)).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe('unrecognized action', () => {
			test('returns the current state.', () => {
				expect(state).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 1,
					wrestlers: [],
				});
				state = reducer(state, incrementAction);
				expect(reducer(state, unrecognizedAction)).toEqual({
					maxRounds: 10,
					refScore: 5,
					roundNumber: 2,
					wrestlers: [],
				});
			});
		});
	});

	describe('selectors', () => {
		describe('get', () => {
			test('returns the appropriate state.', () => {
				state = reducer(state, addWrestlerAction);
				state = reducer(state, incrementAction);
				state = reducer(state, setMaxRoundsAction);
				expect(selectors.get(state)).toEqual({
					maxRounds: 20,
					refScore: 5,
					roundNumber: 2,
					wrestlers: [2],
				});
			});
		});
	});
});
