import actionTypes from '../../actions/actionTypes';
import reducer, * as selectors from './wrestlers';

import _ from 'lodash';

describe('wrestlers reducer', () => {
	const {
		ADD_WRESTLER,
		SET_WRESTLERS,
	} = actionTypes;
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	test('returns initial state of [].', () => {
		expect(initialState).toEqual([]);
	});

	test(`returns current state with "wrestler" from an "${ADD_WRESTLER}" action appended and updated with "id" 1 when current state is empty.`, () => {
		const action = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Hulk Hogan' },
		};
		expect(reducer(initialState, action)).toEqual([
			{
				name: 'Hulk Hogan',
				id: 1,
			},
		]);
	});

	test(`returns current state with "wrestler" from an "${ADD_WRESTLER}" action appended and updated with "id" 1 more than the highest "id" when current state is not empty.`, () => {
		let action = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Ultimate Warrior' },
		};
		let updatedState = reducer(initialState, action);
		expect(updatedState).toEqual([
			{
				name: 'Ultimate Warrior',
				id: 1,
			}
		]);

		action = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Randy Savage' },
		};
		updatedState = reducer(updatedState, action);
		expect(updatedState).toEqual([
			{
				name: 'Ultimate Warrior',
				id: 1,
			},
			{
				name: 'Randy Savage',
				id: 2,
			}
		]);

		action = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Andre the Giant' },
		};
		updatedState = reducer(updatedState, action);
		expect(updatedState).toEqual([
			{
				name: 'Ultimate Warrior',
				id: 1,
			},
			{
				name: 'Randy Savage',
				id: 2,
			},
			{
				name: 'Andre the Giant',
				id: 3,
			}
		]);
	});

	test(`returns "wrestlers" from a "${SET_WRESTLERS}" action.`, () => {
		const action = {
			type: SET_WRESTLERS,
			wrestlers: [
				{
					name: 'Ric Flair',
					id: 1,
				},
				{
					name: 'Sting',
					id: 2,
				},
			],
		};
		expect(reducer(initialState, action)).toEqual(action.wrestlers);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const addWrestlerAction = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Brutus Beefcake' },
		};
		const updatedState = reducer(initialState, addWrestlerAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(updatedState, unrecognizedAction)).toBe(updatedState);
	});
});

describe('wrestlers selectors', () => {
	let initialState;

	beforeEach(() => {
		initialState = reducer(undefined, {});
	});

	describe('get', () => {
		test('returns the appropriate state.', () => {
			expect(selectors.get(initialState)).toBe(initialState);
		});
	});
});
