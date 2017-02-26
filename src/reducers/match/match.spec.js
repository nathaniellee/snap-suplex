import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './match';

const {
	SET_MAX_ROUNDS,
	INCREMENT_ROUND_NUMBER,
	START_MATCH,
	ADD_WRESTLER_TO_MATCH,
} = actionTypes;

describe('match', () => {
	let state;
	let addWrestlerAction;
	let incrementAction;
	let setMaxRoundsAction;
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
			maxRounds: 10,
		};
		startMatchAction = { type: START_MATCH };
    unrecognizedAction = { type: 'unrecognized action' };
	});

	describe('reducer', () => {
		describe('default state', () => {
			test('returns a clean object.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${SET_MAX_ROUNDS}" action`, () => {
			test('sets `maxRounds` in state to the value of `maxRounds` from the action.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, setMaxRoundsAction)).toEqual({
					maxRounds: 10,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${INCREMENT_ROUND_NUMBER}" action`, () => {
			test('increments `roundNumber` in state by 1.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, incrementAction)).toEqual({
					maxRounds: 1,
					roundNumber: 2,
					wrestlers: [],
				});
			});
		});

		describe(`"${START_MATCH}" action`, () => {
			test('sets `roundNumber` in state to 1.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
				state = reducer(state, incrementAction);
				state = reducer(state, incrementAction);
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 3,
					wrestlers: [],
				});
				expect(reducer(state, startMatchAction)).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
			});
		});

		describe(`"${ADD_WRESTLER_TO_MATCH}" action`, () => {
			test('adds the provided id to the `wrestlers` array in state.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
				expect(reducer(state, addWrestlerAction)).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [2],
				});
			});
		});

		describe('unrecognized action', () => {
			test('returns the current state.', () => {
				expect(state).toEqual({
					maxRounds: 1,
					roundNumber: 1,
					wrestlers: [],
				});
				state = reducer(state, incrementAction);
				expect(reducer(state, unrecognizedAction)).toEqual({
					maxRounds: 1,
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
					maxRounds: 10,
					roundNumber: 2,
					wrestlers: [2],
				});
			});
		});
	});
});
