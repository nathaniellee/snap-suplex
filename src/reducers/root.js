import _ from 'lodash';
import { combineReducers } from 'redux';
import match, * as fromMatch from './match/match';
import wrestlers, * as fromWrestlers from './wrestlers/wrestlers';

const root = combineReducers({
	match,
	wrestlers,
});

export default root;
export const get = _.identity;
export const match = {
	getMaxRounds: (state) => fromMatch.getMaxRounds(state.match),
	getRoundNumber: (state) => fromMatch.getRoundNumber(state.match),
	getWrestlers: (state) => fromMatch.getWrestlers(state.match),
};
export const getWrestlers = (state) => fromWrestlers.get(state.wrestlers);
