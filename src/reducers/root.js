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
export const getMatch = (state) => fromMatch.get(state.match);
export const getWrestlers = (state) => fromWrestlers.get(state.wrestlers);
