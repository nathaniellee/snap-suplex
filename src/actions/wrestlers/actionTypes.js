import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER',
	'SET_WRESTLERS',
	'UPDATE_WRESTLER',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
