import _ from 'lodash';

export default _.reduce([
	'ADD_MOVE',
	'UPDATE_MOVE',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
