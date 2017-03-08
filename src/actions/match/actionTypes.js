import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER_TO_MATCH',
	'INCREMENT_ROUND_NUMBER',
	'REMOVE_WRESTLER_FROM_MATCH',
	'SET_DQ_RATING',
	'SET_MAX_ROUNDS',
	'SET_PAGE_INDEX',
	'SET_REF_SCORE',
	'START_MATCH',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
