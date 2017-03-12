import fetch from './fetch/actionTypes';
import matchSetup from './matchSetup/actionTypes';
import moves from './moves/actionTypes';
import wrestlers from './wrestlers/actionTypes';

export default {
	...fetch,
	...matchSetup,
	...moves,
	...wrestlers,
};
