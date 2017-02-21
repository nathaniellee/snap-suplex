import fetch from './fetch/actionTypes';
import match from './match/actionTypes';
import wrestlers from './wrestlers/actionTypes';

export default {
	...fetch,
	...match,
	...wrestlers,
};
