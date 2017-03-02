import fetch from './fetch/actionTypes';
import match from './match/actionTypes';
import moves from './moves/actionTypes';
import wrestlers from './wrestlers/actionTypes';

export default {
	...fetch,
	...match,
	...moves,
	...wrestlers,
};
