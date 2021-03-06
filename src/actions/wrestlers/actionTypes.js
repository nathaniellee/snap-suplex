import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER',
	'SET_WRESTLERS',
	'UPDATE_WRESTLER',
	'POST_MOVE_REQUEST',
	'POST_MOVE_SUCCESS',
	'POST_MOVE_FAILURE',
	'PUT_MOVE_REQUEST',
	'PUT_MOVE_SUCCESS',
	'PUT_MOVE_FAILURE',
	'POST_WRESTLER_REQUEST',
	'POST_WRESTLER_SUCCESS',
	'POST_WRESTLER_FAILURE',
	'PUT_WRESTLER_REQUEST',
	'PUT_WRESTLER_SUCCESS',
	'PUT_WRESTLER_FAILURE',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
