import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER_TO_MATCH',
	'REMOVE_WRESTLER_FROM_MATCH',
	'SET_DQ_RATING',
	'SET_MAX_ROUNDS',
	'SET_PAGE_INDEX',
	'SET_REF_SCORE',
	'SET_STRATEGIES',
	'START_MATCH',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
