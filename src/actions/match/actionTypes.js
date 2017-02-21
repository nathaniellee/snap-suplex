import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER_TO_MATCH',
	'INCREMENT_ROUND_NUMBER',
	'DECREMENT_ROUND_NUMBER',
	'SET_MAX_ROUNDS',
	'START_MATCH',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
