import _ from 'lodash';

export default _.reduce([
	'ADD_MOVE',
	'SET_MOVES',
	'UPDATE_MOVE',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
