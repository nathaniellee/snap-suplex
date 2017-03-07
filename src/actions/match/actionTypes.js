import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER_TO_MATCH',
	'INCREMENT_ROUND_NUMBER',
	'SET_MAX_ROUNDS',
	'SET_REF_SCORE',
	'START_MATCH',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
