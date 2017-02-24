import _ from 'lodash';
import { combineReducers } from 'redux';
import match, * as fromMatch from './match/match';
import wrestlers, * as fromWrestlers from './wrestlers/wrestlers';

const root = combineReducers({
	match,
	wrestlers,
});

export default root;
export const selectors = {
	get: _.identity,
	match: {
		getMaxRounds: (state) => fromMatch.getMaxRounds(state.match),
		getRoundNumber: (state) => fromMatch.getRoundNumber(state.match),
		getWrestlers: (state) => fromMatch.getWrestlers(state.match),
	},
	wrestlers: {
		getWrestler: (state, id) => fromWrestlers.getWrestler(state.wrestlers, id),
		getWrestlers: (state) => fromWrestlers.getWrestlers(state.wrestlers),
	},
};
