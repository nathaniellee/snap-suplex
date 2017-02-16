import _ from 'lodash';

export default _.reduce([
	'ADD_WRESTLER',
	'SET_WRESTLERS',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
