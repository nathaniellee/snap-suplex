import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER_TO_MATCH',
	'REMOVE_WRESTLER_FROM_MATCH',
	'RESET_MATCH',
	'RESOLVE_CURRENT_ROUND',
	'SET_DQ_RATING',
	'SET_NUM_ROUNDS',
	'SET_PAGE_INDEX',
	'SET_REF_SCORE',
	'SET_STRATEGIES',
	'START_MATCH',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
