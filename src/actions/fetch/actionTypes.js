import _ from 'lodash';

export default _.reduce([
	'FETCH_MOVES_REQUEST',
	'FETCH_MOVES_SUCCESS',
	'FETCH_MOVES_FAILURE',
	'FETCH_WRESTLERS_REQUEST',
	'FETCH_WRESTLERS_SUCCESS',
	'FETCH_WRESTLERS_FAILURE',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
