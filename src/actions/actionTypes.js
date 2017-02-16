import _ from 'lodash';

const matchActionTypes = [
	'ADD_WRESTLER_TO_MATCH',
	'INCREMENT_ROUND_NUMBER',
	'DECREMENT_ROUND_NUMBER',
	'SET_MAX_ROUNDS',
	'START_MATCH',
];

const rosterActionTypes = [
	'ADD_WRESTLER',
	'SET_WRESTLERS',
];

export default _.reduce([
	...matchActionTypes,
	...rosterActionTypes,
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
