import _ from 'lodash';

export default _.reduce([
	'FETCH_WRESTLERS_REQUEST',
	'FETCH_WRESTLERS_SUCCESS',
	'FETCH_WRESTLERS_FAILURE',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
