import _ from 'lodash';
import match from './match/actionTypes';
import wrestlers from './wrestlers/actionTypes';

export default _.reduce([
	...match,
	...wrestlers,
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
