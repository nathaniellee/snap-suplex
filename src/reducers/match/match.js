import _ from 'lodash';
import { combineReducers } from 'redux';
import maxRounds, * as fromMaxRounds from './maxRounds/maxRounds';
import roundNumber, * as fromRoundNumber from './roundNumber/roundNumber';
import wrestlers, * as fromWrestlers from './wrestlers/wrestlers';

const match = combineReducers({
	maxRounds,
	roundNumber,
	wrestlers,
});

export default match;
export const get = _.identity;
export const getMaxRounds = (state) => fromMaxRounds.get(state.maxRounds);
export const getRoundNumber = (state) => fromRoundNumber.get(state.roundNumber);
export const getWrestlers = (state) => fromWrestlers.get(state.wrestlers);
