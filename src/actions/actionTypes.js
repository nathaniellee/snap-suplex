import _ from 'lodash';
import match from './match/actionTypes';
import wrestlers from './match/actionTypes';

export default _.reduce([
	...match,
	...wrestlers,
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
