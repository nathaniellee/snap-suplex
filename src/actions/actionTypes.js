import _ from 'lodash';
import fetch from './fetch/actionTypes';
import match from './match/actionTypes';
import wrestlers from './wrestlers/actionTypes';

export default _.reduce([
	...fetch,
	...match,
	...wrestlers,
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
