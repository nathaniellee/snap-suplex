import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, * as selectors from './wrestlers';

const {
	ADD_WRESTLER,
	SET_WRESTLERS,
} = actionTypes;

const setWrestlersAction = {
	type: SET_WRESTLERS,
	wrestlers: [
		{
			name: 'Steve Austin',
			id: 1,
		},
		{
			name: 'The Rock',
			id: 2,
		},
	],
};

describe('wrestlers reducer', () => {
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
		expect(reducer(initialState, setWrestlersAction)).toEqual(setWrestlersAction.wrestlers);
	});

	test(`returns current state when it receives an unrecognized action.`, () => {
		const addWrestlerAction = {
			type: ADD_WRESTLER,
			wrestler: { name: 'Brutus Beefcake' },
		};
		const updatedState = reducer(initialState, addWrestlerAction);
		const unrecognizedAction = { type: 'unrecognized action' };

		expect(reducer(updatedState, unrecognizedAction)).toEqual(updatedState);
	});
});

describe('wrestlers selectors', () => {
	describe('getWrestler', () => {
		test('returns the appropriate state.', () => {
			const initialState = reducer(undefined, setWrestlersAction);
			expect(selectors.getWrestler(initialState, 1)).toEqual(_.find(initialState, { id: 1 }));
		});
	});

	describe('getWrestlers', () => {
		test('returns the appropriate state.', () => {
			const initialState = reducer(undefined, {});
			expect(selectors.getWrestlers(initialState)).toEqual(initialState);
		});
	});
});
